import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CompleteProfileDto } from '../auth/dto/complete-profile.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getCurrentUser(@Req() req) {
    return this.usersService.findById(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('complete-profile')
  async completeProfile(@Req() req, @Body() dto: CompleteProfileDto) {
    return this.usersService.completeProfile(req.user.userId, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('update')
  async updateUser(@Req() req, @Body() body: any) {
    return this.usersService.updateUser(req.user.userId, body);
  }

  @UseGuards(JwtAuthGuard)
  @Post('metrics')
logWeight(@Req() req, @Body('weightKg') weightKg: number) {
  return this.usersService.logWeight(req.user.userId, weightKg);
}

}
