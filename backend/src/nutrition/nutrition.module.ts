import { Module } from '@nestjs/common';
import { NutritionService } from './nutrition.service';
import { NutritionController } from './nutrition.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [NutritionController],
  providers: [NutritionService],
  exports: [NutritionService], // IMPORTANT
})
export class NutritionModule {}
