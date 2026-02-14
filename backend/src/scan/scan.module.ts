import { Module } from '@nestjs/common';
import { ScanController } from './scan.controller';
import { ScanService } from './scan.service';
import { OcrService } from './ocr.service';
import { AiService } from './ai.service';

@Module({
  controllers: [ScanController],
  providers: [ScanService, OcrService, AiService],
})
export class ScanModule {}
