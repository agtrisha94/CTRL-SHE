import {
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CosylabService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async getRecipes(cuisine = 'Indian', page = 1) {
    try {
      const baseUrl = this.configService.get<string>('COSYLAB_BASE_URL');
      const token = this.configService.get<string>('COSYLAB_API_TOKEN');

      if (!baseUrl || !token) {
        throw new Error('CosyLab configuration missing');
      }

      const url = `${baseUrl}/recipe2-api/recipes_cuisine/cuisine/${cuisine}`;

      const response = await firstValueFrom(
        this.httpService.get(url, {
          params: {
            page,
            page_size: 10,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
          timeout: 15000,
        }),
      );

      return response.data;
    } catch (error) {
      console.error(
        'CosyLab Error:',
        error.response?.data || error.message,
      );

      throw new InternalServerErrorException(
        'Failed to fetch recipes from CosyLab',
      );
    }
  }
}
