/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException, Inject, forwardRef } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from '../users/user-role.enum';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  async validateUser(email: string, pass: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) return null;
    const match = await bcrypt.compare(pass, user.password);
    if (match) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { sub: Number(user.id), email: user.email, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }


  // auth.service.ts
async register(
  name: string,
  email: string,
  password: string,
  phone?: string,
  role?: UserRole,
) {
  const existing = await this.usersService.findByEmail(email);
  if (existing) throw new UnauthorizedException('User already exists');

  const user = await this.usersService.create(
    name,
    email,
    password,
    phone,
    role ?? UserRole.USER, // default ако не е дадено
  );

  return user; // веќе password не се враќа
}

}
