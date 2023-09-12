/*
  Warnings:

  - Added the required column `uslTeamId` to the `MatchTeam` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MatchTeam" ADD COLUMN     "uslTeamId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "UslTeams" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "conference" TEXT NOT NULL,

    CONSTRAINT "UslTeams_pkey" PRIMARY KEY ("id")
);
