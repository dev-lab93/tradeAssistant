import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ForexRate } from './entities/forex-rate.entity';
import { CreateForexRateDto } from './dto/create-forex-rate.dto';

@Injectable()
export class ForexRateService {
  constructor(
    @InjectRepository(ForexRate)
    private forexRepository: Repository<ForexRate>,
  ) {}

  async create(dto: CreateForexRateDto) {
    const record = this.forexRepository.create(dto);
    return this.forexRepository.save(record);
  }

  async findAll() {
    return this.forexRepository.find({ order: { createdAt: 'DESC' } });
  }

  async findLatest() {
    return this.forexRepository.findOne({ order: { createdAt: 'DESC' } });
  }
}
