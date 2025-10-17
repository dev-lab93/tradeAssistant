/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('forex_rates')
export class ForexRate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  base: string;

  @Column('jsonb')
  rates: Record<string, number>;

  @CreateDateColumn()
  createdAt: Date;
}
