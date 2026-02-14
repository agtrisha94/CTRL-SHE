import { Module } from '@nestjs/common';
import { NutritionService } from './nutrition.service';

@Module({
  providers: [NutritionService],
  exports: [NutritionService], // IMPORTANT
})
export class NutritionModule {}
