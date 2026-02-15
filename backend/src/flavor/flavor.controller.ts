import {
  Controller,
  Get,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { FlavorService } from './flavor.service';

@Controller('flavor')
export class FlavorController {
  constructor(private readonly flavorService: FlavorService) {}

  @Get('swap')
  async swap(@Query('ingredient') ingredient: string) {
    if (!ingredient) {
      throw new BadRequestException('ingredient query param is required');
    }

    return this.flavorService.getSwapSuggestions(
      ingredient.trim().toLowerCase(),
    );
  }
}
