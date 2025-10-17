/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ForexRateService } from './forex-rate.service';

@Injectable()
export class ForexAnalysisService {
  constructor(private readonly forexRateService: ForexRateService) {}

  async analyzeTrends() {
    const records = await this.forexRateService.findAll();
    if (records.length < 3)
      return { message: 'Нема доволно податоци за дневна анализа (потребни се 3 фетча).' };

    // Ги земаме последните 3 записи (најновите)
    const [latest, mid, first] = records.slice(0, 3);

    const trends = Object.keys(latest.rates).map((currency) => {
      const start = first.rates[currency];
      const midt = mid.rates[currency];
      const end = latest.rates[currency];
      const change = ((end - start) / start) * 100;

      return {
        currency,
        start,
        mid: midt,
        end,
        dailyChange: Number(change.toFixed(3)),
        trend:
          change > 0 ? '📈 Раст во текот на денот' :
          change < 0 ? '📉 Пад во текот на денот' :
          '⏸️ Без промена',
      };
    });

    return {
      base: latest.base,
      from: first.createdAt,
      to: latest.createdAt,
      trends,
    };
  }
}
