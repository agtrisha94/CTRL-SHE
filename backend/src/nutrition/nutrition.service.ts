import { Injectable } from '@nestjs/common';
import { ActivityLevel, GoalType, Gender } from '@prisma/client';

@Injectable()
export class NutritionService {

  private activityMultipliers: Record<ActivityLevel, number> = {
    SEDENTARY: 1.2,
    LIGHTLY_ACTIVE: 1.375,
    MODERATELY_ACTIVE: 1.55,
    VERY_ACTIVE: 1.725,
    ATHLETE: 1.9,
  };

  calculateInitialTargets(params: {
    age: number;
    gender: Gender;
    heightCm: number;
    weightKg: number;
    activityLevel: ActivityLevel;
    goalType: GoalType;
  }) {

    const { age, gender, heightCm, weightKg, activityLevel, goalType } = params;

    const bmi = this.calculateBMI(heightCm, weightKg);
    const bmr = this.calculateBMR(age, gender, heightCm, weightKg);
    const tdee = this.calculateTDEE(bmr, activityLevel);

    const baseCalories = this.calculateGoalAdjustedCalories(tdee, goalType);

    const macros = this.calculateMacros(baseCalories, weightKg, goalType);

    return {
      bmi,
      bmr,
      tdee,
      baseCalories,
      ...macros,
    };
  }

  // 🔹 BMI
  calculateBMI(heightCm: number, weightKg: number): number {
    const heightM = heightCm / 100;
    return Number((weightKg / (heightM * heightM)).toFixed(1));
  }

  // 🔹 BMR (Mifflin-St Jeor)
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

  // 🔹 TDEE
  calculateTDEE(bmr: number, activityLevel: ActivityLevel): number {
    return Math.round(bmr * this.activityMultipliers[activityLevel]);
  }

  // 🔹 Goal adjustment
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

  // 🔹 Macros
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

  // 🔹 BMI Category (computed, not stored)
  getBMICategory(bmi: number): string {
    if (bmi < 18.5) return 'UNDERWEIGHT';
    if (bmi < 25) return 'NORMAL';
    if (bmi < 30) return 'OVERWEIGHT';
    return 'OBESE';
  }
}
