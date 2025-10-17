import { IsString, IsObject } from 'class-validator';

export class CreateForexRateDto {
  @IsString()
  base: string;

  @IsObject()
  rates: Record<string, number>;
}
