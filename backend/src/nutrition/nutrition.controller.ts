import {
  Controller,
  Get,
  UseGuards,
  Req,
} from '@nestjs/common';
import { NutritionService } from './nutrition.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('nutrition')
export class NutritionController {
  constructor(private readonly nutritionService: NutritionService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  getMyNutrition(@Req() req) {
    return this.nutritionService.calculateFromUser(
      req.user.userId,
    );
  }
}
