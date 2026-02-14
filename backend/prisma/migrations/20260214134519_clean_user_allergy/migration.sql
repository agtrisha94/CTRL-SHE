/*
  Warnings:

  - The primary key for the `Disease` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `DiseaseBeneficialNutrient` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `DiseaseRestrictedIngredient` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `DiseaseRestrictedNutrient` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `UserAllergy` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `allergenName` on the `UserAllergy` table. All the data in the column will be lost.
  - The primary key for the `UserDisease` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `allergyId` to the `UserAllergy` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "DiseaseBeneficialNutrient" DROP CONSTRAINT "DiseaseBeneficialNutrient_diseaseId_fkey";

-- DropForeignKey
ALTER TABLE "DiseaseRestrictedIngredient" DROP CONSTRAINT "DiseaseRestrictedIngredient_diseaseId_fkey";

-- DropForeignKey
ALTER TABLE "DiseaseRestrictedNutrient" DROP CONSTRAINT "DiseaseRestrictedNutrient_diseaseId_fkey";

-- DropForeignKey
ALTER TABLE "UserAllergy" DROP CONSTRAINT "UserAllergy_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserDisease" DROP CONSTRAINT "UserDisease_diseaseId_fkey";

-- AlterTable
ALTER TABLE "Disease" DROP CONSTRAINT "Disease_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Disease_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Disease_id_seq";

-- AlterTable
ALTER TABLE "DiseaseBeneficialNutrient" DROP CONSTRAINT "DiseaseBeneficialNutrient_pkey",
ALTER COLUMN "diseaseId" SET DATA TYPE TEXT,
ADD CONSTRAINT "DiseaseBeneficialNutrient_pkey" PRIMARY KEY ("diseaseId", "nutrientName");

-- AlterTable
ALTER TABLE "DiseaseRestrictedIngredient" DROP CONSTRAINT "DiseaseRestrictedIngredient_pkey",
ALTER COLUMN "diseaseId" SET DATA TYPE TEXT,
ADD CONSTRAINT "DiseaseRestrictedIngredient_pkey" PRIMARY KEY ("diseaseId", "ingredientId");

-- AlterTable
ALTER TABLE "DiseaseRestrictedNutrient" DROP CONSTRAINT "DiseaseRestrictedNutrient_pkey",
ALTER COLUMN "diseaseId" SET DATA TYPE TEXT,
ADD CONSTRAINT "DiseaseRestrictedNutrient_pkey" PRIMARY KEY ("diseaseId", "nutrientName");

-- AlterTable
ALTER TABLE "UserAllergy" DROP CONSTRAINT "UserAllergy_pkey",
DROP COLUMN "allergenName",
ADD COLUMN     "allergyId" TEXT NOT NULL,
ADD CONSTRAINT "UserAllergy_pkey" PRIMARY KEY ("userId", "allergyId");

-- AlterTable
ALTER TABLE "UserDisease" DROP CONSTRAINT "UserDisease_pkey",
ALTER COLUMN "diseaseId" SET DATA TYPE TEXT,
ADD CONSTRAINT "UserDisease_pkey" PRIMARY KEY ("userId", "diseaseId");

-- CreateTable
CREATE TABLE "Allergy" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Allergy_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Allergy_name_key" ON "Allergy"("name");

-- AddForeignKey
ALTER TABLE "UserAllergy" ADD CONSTRAINT "UserAllergy_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAllergy" ADD CONSTRAINT "UserAllergy_allergyId_fkey" FOREIGN KEY ("allergyId") REFERENCES "Allergy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserDisease" ADD CONSTRAINT "UserDisease_diseaseId_fkey" FOREIGN KEY ("diseaseId") REFERENCES "Disease"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiseaseBeneficialNutrient" ADD CONSTRAINT "DiseaseBeneficialNutrient_diseaseId_fkey" FOREIGN KEY ("diseaseId") REFERENCES "Disease"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiseaseRestrictedNutrient" ADD CONSTRAINT "DiseaseRestrictedNutrient_diseaseId_fkey" FOREIGN KEY ("diseaseId") REFERENCES "Disease"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiseaseRestrictedIngredient" ADD CONSTRAINT "DiseaseRestrictedIngredient_diseaseId_fkey" FOREIGN KEY ("diseaseId") REFERENCES "Disease"("id") ON DELETE CASCADE ON UPDATE CASCADE;
