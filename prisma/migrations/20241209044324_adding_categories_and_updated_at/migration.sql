/*
  Warnings:

  - Added the required column `updatedAt` to the `Recipe` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN     "categories" TEXT[],
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
