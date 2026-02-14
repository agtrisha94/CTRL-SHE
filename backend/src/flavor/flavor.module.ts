import { Module } from '@nestjs/common';
import { FlavorService } from './flavor.service';
import { FlavorController } from './flavor.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [FlavorController],
  providers: [FlavorService, PrismaService],
})
export class FlavorModule {}
