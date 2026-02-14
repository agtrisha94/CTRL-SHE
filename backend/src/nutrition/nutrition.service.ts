import { Injectable, BadRequestException } from '@nestjs/common';
import { ActivityLevel, GoalType, Gender } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NutritionService {
  constructor(private prisma: PrismaService) {}

  private activityMultipliers: Record<ActivityLevel, number> = {
    SEDENTARY: 1.2,
    LIGHTLY_ACTIVE: 1.375,
    MODERATELY_ACTIVE: 1.55,
    VERY_ACTIVE: 1.725,
    ATHLETE: 1.9,
  };

  async calculateFromUser(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    if (
      !user.age ||
      !user.heightCm ||
      !user.weightKg ||
      !user.activityLevel ||
      !user.goalType ||
      !user.gender
    ) {
      throw new BadRequestException(
        'User profile incomplete',
      );
    }

    const result = this.calculateInitialTargets({
      age: user.age,
      gender: user.gender,
      heightCm: user.heightCm,
      weightKg: user.weightKg,
      activityLevel: user.activityLevel,
      goalType: user.goalType,
    });

    return {
      ...result,
      bmiCategory: this.getBMICategory(result.bmi),
    };
  }

  calculateInitialTargets(params: {
    age: number;
    gender: Gender;
    heightCm: number;
    weightKg: number;
    activityLevel: ActivityLevel;
    goalType: GoalType;
  }) {
    const { age, gender, heightCm, weightKg, activityLevel, goalType } =
      params;

    const bmi = this.calculateBMI(heightCm, weightKg);
    const bmr = this.calculateBMR(age, gender, heightCm, weightKg);
    const tdee = this.calculateTDEE(bmr, activityLevel);
    const baseCalories = this.calculateGoalAdjustedCalories(
      tdee,
      goalType,
    );
    const macros = this.calculateMacros(
      baseCalories,
      weightKg,
      goalType,
    );

    return {
      bmi,
      bmr,
      tdee,
      baseCalories,
      ...macros,
    };
  }

  calculateBMI(heightCm: number, weightKg: number): number {
    const heightM = heightCm / 100;
    return Number((weightKg / (heightM * heightM)).toFixed(1));
  }

  calculateBMR(
    age: number,
    gender: Gender,
    heightCm: number,
    weightKg: number,
  ): number {
    const base =
      10 * weightKg + 6.25 * heightCm - 5 * age;

    return gender === 'MALE'
      ? Math.round(base + 5)
      : Math.round(base - 161);
  }

  calculateTDEE(
    bmr: number,
    activityLevel: ActivityLevel,
  ): number {
    return Math.round(
      bmr * this.activityMultipliers[activityLevel],
    );
  }

  calculateGoalAdjustedCalories(
    tdee: number,
    goalType: GoalType,
  ): number {
    let adjustment = 0;

    if (goalType === 'WEIGHT_LOSS') adjustment = -400;
    if (goalType === 'MUSCLE_GAIN') adjustment = 300;

    let calories = tdee + adjustment;

    if (calories < 1200) calories = 1200;

    return Math.round(calories);
  }

  calculateMacros(
    calories: number,
    weightKg: number,
    goalType: GoalType,
  ) {
    let proteinPerKg = 1.6;

    if (goalType === 'WEIGHT_LOSS') proteinPerKg = 1.8;
    if (goalType === 'MUSCLE_GAIN') proteinPerKg = 2.0;

    const proteinG = Math.round(weightKg * proteinPerKg);
    const fatsG = Math.round(weightKg * 0.8);

    const remainingCalories =
      calories - proteinG * 4 - fatsG * 9;

    const carbsG = Math.round(remainingCalories / 4);

    return {
      proteinG,
      fatsG,
      carbsG,
    };
  }

  getBMICategory(bmi: number): string {
    if (bmi < 18.5) return 'UNDERWEIGHT';
    if (bmi < 25) return 'NORMAL';
    if (bmi < 30) return 'OVERWEIGHT';
    return 'OBESE';
  }
}
