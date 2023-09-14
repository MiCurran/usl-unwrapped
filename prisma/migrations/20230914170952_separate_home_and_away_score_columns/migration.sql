/*
  Warnings:

  - Added the required column `awayTeamScore` to the `Match` table without a default value. This is not possible if the table is not empty.
  - Added the required column `homeTeamScore` to the `Match` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Match" ADD COLUMN     "awayTeamScore" TEXT NOT NULL,
ADD COLUMN     "homeTeamScore" TEXT NOT NULL;
