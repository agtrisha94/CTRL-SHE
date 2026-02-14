import {
  Controller,
  Get,
  Query,
  Req,
  BadRequestException,
  UseGuards
} from '@nestjs/common';
import { FlavorService } from './flavor.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('flavor')
export class FlavorController {
  constructor(private readonly flavorService: FlavorService) {}

  
  @UseGuards(JwtAuthGuard)
@Get('swap')
async swap(
  @Query('ingredient') ingredient: string,
  @Req() req
) {
  return this.flavorService.getSwapSuggestions(
    ingredient,
    req.user.userId
  );
}

}
