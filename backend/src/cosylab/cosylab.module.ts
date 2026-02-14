import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CosylabService } from './cosylab.service';
import { CosylabController } from './cosylab.controller';

@Module({
  imports: [HttpModule],
  controllers: [CosylabController],
  providers: [CosylabService],
})
export class CosylabModule {}