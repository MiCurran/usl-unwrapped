/*
  Warnings:

  - Added the required column `awayTeamUslId` to the `Match` table without a default value. This is not possible if the table is not empty.
  - Added the required column `homeTeamUslId` to the `Match` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Match" ADD COLUMN     "awayTeamUslId" INTEGER NOT NULL,
ADD COLUMN     "homeTeamUslId" INTEGER NOT NULL;
