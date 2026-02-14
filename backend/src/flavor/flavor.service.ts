import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import axios from 'axios';

@Injectable()
export class FlavorService {
  constructor(private readonly prisma: PrismaService) {}

  async getSwapSuggestions(food: string, userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    try {
      const response = await axios.get(
  `${process.env.FLAVORDB_BASE_URL}/food/by-alias`,
  {
    params: {
      food_pair: food,
    },
    headers: {
      Authorization: `Bearer ${process.env.FLAVORDB_API_TOKEN}`,
    },
  },
);


      const similar = response.data?.topSimilarEntities;

      if (!similar || similar.length === 0) {
        return [];
      }

      const names = similar.map((item: any) => item.entityName);

    //   const ingredients = await this.prisma.ingredient.findMany({
    //     where: {
    //       name: {
    //         in: names,
    //         mode: 'insensitive',
    //       },
    //     },
    //   });
    const ingredients = await this.prisma.ingredient.findMany({
  where: {
    OR: names.map(name => ({
      name: {
        contains: name,
        mode: 'insensitive',
      },
    })),
  },
});

console.log(names);

      const results = similar
        .map((item: any) => {
          const match = ingredients.find(
            (i) =>
              i.name.toLowerCase() ===
              item.entityName.toLowerCase(),
          );

          if (!match) return null;

          // Allergy filter
          if (
            user.allergies &&
            user.allergies.includes(match.name)
          ) {
            return null;
          }

          // Basic diet filter
          if (user.dietType === 'VEGAN') {
            const forbiddenCategories = [
              'meat',
              'fish',
              'egg',
              'dairy',
            ];

            if (
              match.category &&
              forbiddenCategories.includes(
                match.category.toLowerCase(),
              )
            ) {
              return null;
            }
          }

          const score = item.similarMolecules;

          let confidence = 'LOW';
          if (score > 160) confidence = 'HIGH';
          else if (score > 140) confidence = 'MEDIUM';

          return {
            id: match.id,
            name: match.name,
            category: match.category,
            similarityScore: score,
            confidence,
            reason: `Shares ${score} flavor molecules with ${food}`,
          };
        })
        .filter(Boolean)
        .sort(
          (a: any, b: any) =>
            b.similarityScore - a.similarityScore,
        )
        .slice(0, 8);
const count = await this.prisma.ingredient.count();
console.log("Total ingredients in DB:", count);
      return results;
    } catch (error) {
      throw new InternalServerErrorException(
        'Flavor service temporarily unavailable',
      );
      
    }
    

  }
}
