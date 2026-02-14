import { Injectable } from '@nestjs/common';
import { OcrService } from './ocr.service';
import { AiService } from './ai.service';

@Injectable()
export class ScanService {
  constructor(private aiService: AiService) {}

  async processImage(imageBuffer: Buffer) {
    return this.aiService.identifyIngredients(imageBuffer);
  }
}

