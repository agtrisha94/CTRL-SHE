/*
  Warnings:

  - You are about to drop the column `dailyCalorieGoal` on the `User` table. All the data in the column will be lost.
  - The `gender` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "dailyCalorieGoal",
ADD COLUMN     "baseCalorieTarget" INTEGER,
ADD COLUMN     "carbTargetG" INTEGER,
ADD COLUMN     "currentCalorieTarget" INTEGER,
ADD COLUMN     "fatTargetG" INTEGER,
ADD COLUMN     "proteinTargetG" INTEGER,
DROP COLUMN "gender",
ADD COLUMN     "gender" "Gender";
