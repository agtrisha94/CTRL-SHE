import { IsEnum, IsInt, IsNumber, Min } from 'class-validator';
import { ActivityLevel, GoalType, Gender } from '@prisma/client';

export class CalculateNutritionDto {
  @IsInt()
  @Min(1)
  age: number;

  @IsEnum(Gender)
  gender: Gender;

  @IsNumber()
  heightCm: number;

  @IsNumber()
  weightKg: number;

  @IsEnum(ActivityLevel)
  activityLevel: ActivityLevel;

  @IsEnum(GoalType)
  goalType: GoalType;
}
