import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from '../prisma/prisma.service';
import { NutritionModule } from '../nutrition/nutrition.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [NutritionModule,PrismaModule],
  controllers: [UsersController],
  providers: [UsersService, PrismaService],
})
export class UsersModule {}
