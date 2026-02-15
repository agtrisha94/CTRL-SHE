import {
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import axios from 'axios';

@Injectable()
export class FlavorService {
  constructor(private readonly prisma: PrismaService) {}

  async getSwapSuggestions(ingredient: string) {
    try {
      // 1️⃣ Ask FlavorDB for similar entities
      const response = await axios.get(
        `${process.env.FLAVORDB_BASE_URL}/food/by-alias`,
        {
          params: { food_pair: ingredient },
          headers: {
            Authorization: `Bearer ${process.env.FLAVORDB_API_TOKEN}`,
          },
        },
      );

      const similarEntities = response.data?.topSimilarEntities;

      if (!Array.isArray(similarEntities) || similarEntities.length === 0) {
        return { ingredient, swaps: [] };
      }

      // 2️⃣ Get names from FlavorDB
      const candidateNames = similarEntities.map(
        (item: any) => item.entityName,
      );

      // 3️⃣ Try to match with DB (best effort, not mandatory)
      const dbIngredients = await this.prisma.ingredient.findMany({
        where: {
          OR: candidateNames.map((name) => ({
            name: {
              contains: name,
              mode: 'insensitive',
            },
          })),
        },
      });

      // 4️⃣ Build swaps — NO HARD FILTERING
      const swaps = similarEntities
        .map((item: any) => {
          const dbMatch = dbIngredients.find(
            (i) =>
              i.name.toLowerCase() === item.entityName.toLowerCase(),
          );

          return {
            id: dbMatch?.id ?? null,
            name: dbMatch?.name ?? item.entityName,
            category: dbMatch?.category ?? null,
            similarityScore: item.similarMolecules ?? 0,
            reason: `Flavor-similar alternate for ${ingredient}`,
          };
        })
        .sort(
          (a: any, b: any) =>
            b.similarityScore - a.similarityScore,
        )
        .slice(0, 8);

      return {
        ingredient,
        swaps,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Flavor swap service unavailable',
      );
    }
  }
}
