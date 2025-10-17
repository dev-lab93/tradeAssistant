/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ForexRateService } from './forex-rate.service';
import { ForexApiResponse } from './dto/forex-api-response.dto';

@Injectable()
export class ForexFetchService {
    private readonly logger = new Logger(ForexFetchService.name);
    private readonly API_URL =
        'https://api.forexrateapi.com/v1/latest?api_key=e72bc7f3a3c16ca609354e27734c4c8f&base=USD&currencies=GBP,CHF,EUR,CAD,AUD,MKD';

    constructor(private readonly forexRateService: ForexRateService) { }

    // Автоматски повик на секои 8 часа
    @Cron(CronExpression.EVERY_8_HOURS)
    async fetchAndSave() {
        try {
            const response = await axios.get<ForexApiResponse>(this.API_URL); // Type-safe
            const data = response.data;

            await this.forexRateService.create({
                base: data.base,
                rates: data.rates,
            });


            this.logger.log('✅ Forex rates successfully updated.');
        } catch (error) {
            this.logger.error('❌ Error fetching forex rates:', error.message);
        }
    }
}
