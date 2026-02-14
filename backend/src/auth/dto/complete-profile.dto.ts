import {
  IsEnum,
  IsInt,
  IsString,
  IsArray,
  IsOptional,
  ArrayNotEmpty,
} from 'class-validator';
import { ActivityLevel, GoalType, DietType } from '@prisma/client';

export class CompleteProfileDto {
  @IsString()
  name: string;

  @IsInt()
  age: number;

  @IsString()
  gender: string;

  @IsInt()
  heightCm: number;

  @IsInt()
  weightKg: number;

  @IsEnum(ActivityLevel)
  activityLevel: ActivityLevel;

  @IsEnum(GoalType)
  goalType: GoalType;

  @IsEnum(DietType)
  dietType: DietType;

  @IsString()
  country: string;

  @IsString()
  defaultCuisine: string;

  @IsOptional()
  @IsArray()
  allergies?: string[];

  @IsOptional()
  @IsArray()
  diseases?: string[];
}
