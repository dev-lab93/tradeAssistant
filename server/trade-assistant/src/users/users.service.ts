/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UserRole } from './user-role.enum';

@Injectable()
export class UsersService {
  findOne(id: number) {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
  ) { }

  // users.service.ts
  async create(
  name: string,
  email: string,
  plainPassword: string,
  phone?: string,
  role?: UserRole,
) {
  const existing = await this.usersRepo.findOne({ where: { email } });
  if (existing) throw new ConflictException('Email already in use');

  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(plainPassword, salt);

  const user = this.usersRepo.create({
    name,
    email,
    password: hashed,
    phone,
    role: role ?? UserRole.USER,
  });

  const saved = await this.usersRepo.save(user);
  const { password, ...result } = saved;
  return result;
}


  async findAll() {
    return this.usersRepo.find();
  }

  async findByEmail(email: string) {
    return this.usersRepo.findOne({ where: { email } });
  }

  async findById(id: number) {
    if (!id) throw new NotFoundException('Invalid user id');
    const user = await this.usersRepo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async update(id: number, attrs: Partial<Omit<User, 'id' | 'password'>>) {
    const user = await this.findById(id);
    Object.assign(user, attrs);
    return this.usersRepo.save(user);
  }

  async remove(id: number) {
    const user = await this.findById(id);
    await this.usersRepo.delete(id);
    return { deleted: true };
  }
}
