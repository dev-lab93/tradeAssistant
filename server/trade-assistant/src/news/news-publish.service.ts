/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { NewsService } from './news.service';
import { ForexAnalysisService } from '../forexRate/forex-analysis.service';
import { CreateNewsDto } from '../dto/news/create-article.dto';

@Injectable()
export class NewsPublishService {
  private readonly logger = new Logger(NewsPublishService.name);

  constructor(
    private readonly newsService: NewsService,
    private readonly forexAnalysisService: ForexAnalysisService,
  ) {}

  // Cron секој ден во 08:00
  @Cron('0 8 * * *') // 08:00 секој ден
  async publishDailyForexAnalysis() {
    try {
      const analysis = await this.forexAnalysisService.analyzeTrends();

      // Проверка дали има доволно податоци
      if (!('trends' in analysis) || !analysis.trends?.length) {
        this.logger.warn(
          '⚠️ Нема доволно податоци за дневна анализа денес. News не е објавено.',
        );
        return;
      }

      const todaysDate = new Date().toLocaleDateString();

      const contentLines = analysis.trends.map(t => {
        const start = t.start.toFixed(3);
        const mid = t.mid.toFixed(3);
        const end = t.end.toFixed(3);
        const change = t.dailyChange.toFixed(3);
        return `${t.currency}: Start ${start}, Mid ${mid}, End ${end}, Change ${change}% ${t.trend}`;
      });

      const news: CreateNewsDto = {
        title: `Анализа на валутите во однос со Американскиот Долар, ден ${todaysDate}`,
        content: contentLines.join('\n'),
      };

      const createdNews = await this.newsService.create(news);
      this.logger.log(`✅ Forex analysis news published: ${createdNews.title}`);
    } catch (error) {
      this.logger.error(
        '❌ Error publishing daily Forex analysis:',
        error instanceof Error ? error.message : JSON.stringify(error),
      );
    }
  }
}
