import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CompleteProfileDto } from '../auth/dto/complete-profile.dto';
import { Gender } from '@prisma/client';
import { NutritionService } from '../nutrition/nutrition.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService,
  private readonly nutritionService: NutritionService,) {}

  async findById(id: string) {
  const user = await this.prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      role: true,
      createdAt: true,
      isProfileComplete: true,

      // Profile fields
      name: true,
      age: true,
      gender: true,
      heightCm: true,
      weightKg: true,
      activityLevel: true,
      goalType: true,
      dietType: true,
      country: true,
      defaultCuisine: true,
      allergies: true,
      diseases: true,
    },
  });

  if (!user) {
    throw new NotFoundException('User not found');
  }

  return user;
}


  

  async completeProfile(userId: string, dto: CompleteProfileDto) {
  const user = await this.prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new NotFoundException('User not found');
  }

  if (user.isProfileComplete) {
    throw new BadRequestException('Profile already completed');
  }

  // 🔥 1️⃣ Calculate nutrition targets
  const targets = this.nutritionService.calculateInitialTargets({
    age: dto.age,
    gender: dto.gender as Gender,
    heightCm: dto.heightCm,
    weightKg: dto.weightKg,
    activityLevel: dto.activityLevel,
    goalType: dto.goalType,
  });

  // 🔥 2️⃣ Atomic update
  return this.prisma.user.update({
    where: { id: userId },
    data: {
      name: dto.name,
      age: dto.age,
      gender: dto.gender as Gender,
      heightCm: dto.heightCm,
      weightKg: dto.weightKg,
      activityLevel: dto.activityLevel,
      goalType: dto.goalType,
      dietType: dto.dietType,
      country: dto.country,
      defaultCuisine: dto.defaultCuisine,

      baseCalorieTarget: targets.baseCalories,
      currentCalorieTarget: targets.baseCalories,
      proteinTargetG: targets.proteinG,
      fatTargetG: targets.fatsG,
      carbTargetG: targets.carbsG,

      isProfileComplete: true,

      allergies: dto.allergies ? { set: dto.allergies } : undefined,
      diseases: dto.diseases ? { set: dto.diseases } : undefined,
    },
    select: {
      id: true,
      email: true,
      name: true,
      age: true,
      gender: true,
      heightCm: true,
      weightKg: true,
      activityLevel: true,
      goalType: true,
      dietType: true,
      baseCalorieTarget: true,
      currentCalorieTarget: true,
      proteinTargetG: true,
      fatTargetG: true,
      carbTargetG: true,
      isProfileComplete: true,
    },
  });
}


  async updateUser(userId: string, data: any) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.prisma.user.update({
      where: { id: userId },
      data: {
        ...data,
        gender: data.gender ? (data.gender as Gender) : undefined,
        allergies: data.allergies ? { set: data.allergies } : undefined,
        diseases: data.diseases ? { set: data.diseases } : undefined,
      },
    });
  }

  async logWeight(userId: string, weightKg: number) {
  const user = await this.prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new NotFoundException('User not found');
  }

  if (
    !user.heightCm ||
    !user.age ||
    !user.gender ||
    !user.activityLevel ||
    !user.goalType
  ) {
    throw new BadRequestException('Profile incomplete');
  }

  // 🔹 1️⃣ Recalculate metabolic values
  const bmi = this.nutritionService.calculateBMI(
    user.heightCm,
    weightKg,
  );

  const bmr = this.nutritionService.calculateBMR(
    user.age,
    user.gender,
    user.heightCm,
    weightKg,
  );

  const tdee = this.nutritionService.calculateTDEE(
    bmr,
    user.activityLevel,
  );

  // 🔹 2️⃣ Save weight history
  await this.prisma.userMetricsHistory.create({
    data: {
      userId,
      weightKg,
      bmi,
    },
  });

  // 🔹 3️⃣ Update user metabolic values
  await this.prisma.user.update({
    where: { id: userId },
    data: {
      weightKg,
      bmi,
      bmr,
      tdee,
    },
  });

  return {
    message: 'Weight logged successfully',
    updatedMetrics: {
      weightKg,
      bmi,
      bmr,
      tdee,
      bmiCategory: this.nutritionService.getBMICategory(bmi),
    },
  };
}

}
