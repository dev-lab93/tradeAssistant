import { Controller, Get } from '@nestjs/common';
import { ForexRateService } from './forex-rate.service';
import { ForexAnalysisService } from './forex-analysis.service';
import { ForexFetchService } from './forex-fetch.service';

@Controller('forex')
export class ForexRateController {
  constructor(
    private readonly forexRateService: ForexRateService,
    private readonly forexAnalysisService: ForexAnalysisService,
    private readonly forexFetchService: ForexFetchService,
  ) {}

  @Get('fetch')
  async manualFetch() {
    await this.forexFetchService.fetchAndSave();
    return { message: 'Forex rates fetched manually ✅' };
  }

  @Get('latest')
  async getLatest() {
    return this.forexRateService.findLatest();
  }

  @Get('history')
  async getAll() {
    return this.forexRateService.findAll();
  }

  @Get('trends')
  async analyzeTrends() {
    return this.forexAnalysisService.analyzeTrends();
  }
}
