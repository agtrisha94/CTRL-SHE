import { Controller, Get, Query } from '@nestjs/common';
import { CosylabService } from './cosylab.service';

@Controller('api/cosylab')
export class CosylabController {
  constructor(private readonly cosylabService: CosylabService) {}

  @Get('recipes')
  getRecipes(
    @Query('cuisine') cuisine: string,
    @Query('page') page: string,
  ) {
    return this.cosylabService.getRecipes(
      cuisine || 'Indian',
      parseInt(page) || 1,
    );
  }
}