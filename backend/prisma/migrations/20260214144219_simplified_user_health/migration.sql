/*
  Warnings:

  - You are about to drop the `Allergy` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Disease` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DiseaseBeneficialNutrient` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DiseaseRestrictedIngredient` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DiseaseRestrictedNutrient` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserAllergy` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserDisease` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "DiseaseBeneficialNutrient" DROP CONSTRAINT "DiseaseBeneficialNutrient_diseaseId_fkey";

-- DropForeignKey
ALTER TABLE "DiseaseRestrictedIngredient" DROP CONSTRAINT "DiseaseRestrictedIngredient_diseaseId_fkey";

-- DropForeignKey
ALTER TABLE "DiseaseRestrictedIngredient" DROP CONSTRAINT "DiseaseRestrictedIngredient_ingredientId_fkey";

-- DropForeignKey
ALTER TABLE "DiseaseRestrictedNutrient" DROP CONSTRAINT "DiseaseRestrictedNutrient_diseaseId_fkey";

-- DropForeignKey
ALTER TABLE "UserAllergy" DROP CONSTRAINT "UserAllergy_allergyId_fkey";

-- DropForeignKey
ALTER TABLE "UserAllergy" DROP CONSTRAINT "UserAllergy_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserDisease" DROP CONSTRAINT "UserDisease_diseaseId_fkey";

-- DropForeignKey
ALTER TABLE "UserDisease" DROP CONSTRAINT "UserDisease_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "allergies" TEXT[],
ADD COLUMN     "diseases" TEXT[];

-- DropTable
DROP TABLE "Allergy";

-- DropTable
DROP TABLE "Disease";

-- DropTable
DROP TABLE "DiseaseBeneficialNutrient";

-- DropTable
DROP TABLE "DiseaseRestrictedIngredient";

-- DropTable
DROP TABLE "DiseaseRestrictedNutrient";

-- DropTable
DROP TABLE "UserAllergy";

-- DropTable
DROP TABLE "UserDisease";
