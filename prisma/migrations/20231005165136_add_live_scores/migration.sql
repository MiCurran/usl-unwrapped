/*
  Warnings:

  - You are about to drop the `ApiUsers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "ApiUsers";

-- CreateTable
CREATE TABLE IF NOT EXISTS "LiveScores" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "homeTeamName" TEXT NOT NULL,
    "awayTeamName" TEXT NOT NULL,
    "homeTeamUslId" INTEGER NOT NULL,
    "awayTeamUslId" INTEGER NOT NULL,
    "homeTeamScore" TEXT NOT NULL,
    "awayTeamScore" TEXT NOT NULL,
    "score" TEXT NOT NULL,
    "stats" JSONB NOT NULL,

    CONSTRAINT "LiveScores_pkey" PRIMARY KEY ("id")
);
