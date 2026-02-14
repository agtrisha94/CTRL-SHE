-- CreateEnum
CREATE TYPE "ActivityLevel" AS ENUM ('SEDENTARY', 'LIGHTLY_ACTIVE', 'MODERATELY_ACTIVE', 'VERY_ACTIVE', 'ATHLETE');

-- CreateEnum
CREATE TYPE "DietType" AS ENUM ('VEGAN', 'PESCETARIAN', 'OVO_VEGETARIAN', 'LACTO_VEGETARIAN', 'OVO_LACTO_VEGETARIAN', 'NON_VEGETARIAN');

-- CreateEnum
CREATE TYPE "GoalType" AS ENUM ('WEIGHT_LOSS', 'MAINTENANCE', 'MUSCLE_GAIN');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "name" TEXT,
    "age" INTEGER,
    "gender" TEXT,
    "heightCm" DOUBLE PRECISION,
    "weightKg" DOUBLE PRECISION,
    "bmi" DOUBLE PRECISION,
    "dailyCalorieGoal" DOUBLE PRECISION,
    "activityLevel" "ActivityLevel",
    "goalType" "GoalType" DEFAULT 'MAINTENANCE',
    "dietType" "DietType",
    "country" TEXT,
    "defaultCuisine" TEXT,
    "isProfileComplete" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserPreferredCuisine" (
    "userId" TEXT NOT NULL,
    "cuisineName" TEXT NOT NULL,

    CONSTRAINT "UserPreferredCuisine_pkey" PRIMARY KEY ("userId","cuisineName")
);

-- CreateTable
CREATE TABLE "UserAllergy" (
    "userId" TEXT NOT NULL,
    "allergenName" TEXT NOT NULL,

    CONSTRAINT "UserAllergy_pkey" PRIMARY KEY ("userId","allergenName")
);

-- CreateTable
CREATE TABLE "Recipe" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "cuisine" TEXT,
    "region" TEXT,
    "subRegion" TEXT,
    "dietType" "DietType",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Recipe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ingredient" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT,
    "allergens" TEXT[],

    CONSTRAINT "Ingredient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecipeIngredient" (
    "recipeId" TEXT NOT NULL,
    "ingredientId" INTEGER NOT NULL,
    "quantity" DOUBLE PRECISION,
    "unit" TEXT,

    CONSTRAINT "RecipeIngredient_pkey" PRIMARY KEY ("recipeId","ingredientId")
);

-- CreateTable
CREATE TABLE "RecipeMacronutrients" (
    "recipeId" TEXT NOT NULL,
    "energyKcal" DOUBLE PRECISION,
    "proteinG" DOUBLE PRECISION,
    "carbsG" DOUBLE PRECISION,
    "fatsG" DOUBLE PRECISION,
    "fiberG" DOUBLE PRECISION,
    "sugarG" DOUBLE PRECISION,

    CONSTRAINT "RecipeMacronutrients_pkey" PRIMARY KEY ("recipeId")
);

-- CreateTable
CREATE TABLE "RecipeMicronutrients" (
    "id" SERIAL NOT NULL,
    "recipeId" TEXT NOT NULL,
    "nutrientName" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "unit" TEXT NOT NULL,

    CONSTRAINT "RecipeMicronutrients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Disease" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Disease_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserDisease" (
    "userId" TEXT NOT NULL,
    "diseaseId" INTEGER NOT NULL,

    CONSTRAINT "UserDisease_pkey" PRIMARY KEY ("userId","diseaseId")
);

-- CreateTable
CREATE TABLE "DiseaseBeneficialNutrient" (
    "diseaseId" INTEGER NOT NULL,
    "nutrientName" TEXT NOT NULL,
    "minRecommended" DOUBLE PRECISION,
    "unit" TEXT,

    CONSTRAINT "DiseaseBeneficialNutrient_pkey" PRIMARY KEY ("diseaseId","nutrientName")
);

-- CreateTable
CREATE TABLE "DiseaseRestrictedNutrient" (
    "diseaseId" INTEGER NOT NULL,
    "nutrientName" TEXT NOT NULL,
    "maxAllowed" DOUBLE PRECISION,
    "unit" TEXT,

    CONSTRAINT "DiseaseRestrictedNutrient_pkey" PRIMARY KEY ("diseaseId","nutrientName")
);

-- CreateTable
CREATE TABLE "DiseaseRestrictedIngredient" (
    "diseaseId" INTEGER NOT NULL,
    "ingredientId" INTEGER NOT NULL,

    CONSTRAINT "DiseaseRestrictedIngredient_pkey" PRIMARY KEY ("diseaseId","ingredientId")
);

-- CreateTable
CREATE TABLE "UserFavoriteRecipe" (
    "userId" TEXT NOT NULL,
    "recipeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserFavoriteRecipe_pkey" PRIMARY KEY ("userId","recipeId")
);

-- CreateTable
CREATE TABLE "UserRecipeCookHistory" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "recipeId" TEXT NOT NULL,
    "cookedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserRecipeCookHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserRecipeStats" (
    "userId" TEXT NOT NULL,
    "recipeId" TEXT NOT NULL,
    "timesCooked" INTEGER NOT NULL DEFAULT 0,
    "lastCookedAt" TIMESTAMP(3),

    CONSTRAINT "UserRecipeStats_pkey" PRIMARY KEY ("userId","recipeId")
);

-- CreateTable
CREATE TABLE "UserMetricsHistory" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "weightKg" DOUBLE PRECISION NOT NULL,
    "bmi" DOUBLE PRECISION,
    "recordedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserMetricsHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "RecipeMicronutrients_recipeId_idx" ON "RecipeMicronutrients"("recipeId");

-- CreateIndex
CREATE UNIQUE INDEX "Disease_name_key" ON "Disease"("name");

-- CreateIndex
CREATE INDEX "UserRecipeCookHistory_userId_idx" ON "UserRecipeCookHistory"("userId");

-- CreateIndex
CREATE INDEX "UserRecipeCookHistory_recipeId_idx" ON "UserRecipeCookHistory"("recipeId");

-- CreateIndex
CREATE INDEX "UserMetricsHistory_userId_idx" ON "UserMetricsHistory"("userId");

-- AddForeignKey
ALTER TABLE "UserPreferredCuisine" ADD CONSTRAINT "UserPreferredCuisine_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAllergy" ADD CONSTRAINT "UserAllergy_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeIngredient" ADD CONSTRAINT "RecipeIngredient_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeIngredient" ADD CONSTRAINT "RecipeIngredient_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "Ingredient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeMacronutrients" ADD CONSTRAINT "RecipeMacronutrients_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeMicronutrients" ADD CONSTRAINT "RecipeMicronutrients_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserDisease" ADD CONSTRAINT "UserDisease_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserDisease" ADD CONSTRAINT "UserDisease_diseaseId_fkey" FOREIGN KEY ("diseaseId") REFERENCES "Disease"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiseaseBeneficialNutrient" ADD CONSTRAINT "DiseaseBeneficialNutrient_diseaseId_fkey" FOREIGN KEY ("diseaseId") REFERENCES "Disease"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiseaseRestrictedNutrient" ADD CONSTRAINT "DiseaseRestrictedNutrient_diseaseId_fkey" FOREIGN KEY ("diseaseId") REFERENCES "Disease"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiseaseRestrictedIngredient" ADD CONSTRAINT "DiseaseRestrictedIngredient_diseaseId_fkey" FOREIGN KEY ("diseaseId") REFERENCES "Disease"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiseaseRestrictedIngredient" ADD CONSTRAINT "DiseaseRestrictedIngredient_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "Ingredient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFavoriteRecipe" ADD CONSTRAINT "UserFavoriteRecipe_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFavoriteRecipe" ADD CONSTRAINT "UserFavoriteRecipe_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRecipeCookHistory" ADD CONSTRAINT "UserRecipeCookHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRecipeCookHistory" ADD CONSTRAINT "UserRecipeCookHistory_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRecipeStats" ADD CONSTRAINT "UserRecipeStats_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRecipeStats" ADD CONSTRAINT "UserRecipeStats_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserMetricsHistory" ADD CONSTRAINT "UserMetricsHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
