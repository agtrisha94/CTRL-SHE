/*
  Warnings:

  - You are about to alter the column `bmi` on the `User` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "bmr" INTEGER,
ADD COLUMN     "tdee" INTEGER,
ALTER COLUMN "bmi" SET DATA TYPE INTEGER;
