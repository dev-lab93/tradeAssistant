/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Controller, Get, Param, UseGuards, Request, UseInterceptors, UnauthorizedException, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ExcludePasswordInterceptor } from '../interceptors/exclude-password.interceptor';

@UseInterceptors(ExcludePasswordInterceptor)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllUsers() {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getUser(@Param('id') id: string) {
    const userId = Number(id);
    if (isNaN(userId)) throw new UnauthorizedException('Invalid user ID');
    return this.usersService.findById(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async removeUser(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile/me')
  async getProfile(@Request() req) {
    const userId = Number(req.user?.id);
    if (!userId || isNaN(userId)) throw new UnauthorizedException('Invalid user in token');
    return this.usersService.findById(userId);
  }
}
