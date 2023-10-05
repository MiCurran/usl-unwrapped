/*
  Warnings:

  - You are about to drop the `ApiUsers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "ApiUsers";

-- CreateTable
CREATE TABLE "GoalLeader" (
    "id" SERIAL NOT NULL,
    "rank" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "team" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "season" TEXT NOT NULL,

    CONSTRAINT "GoalLeader_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AssistLeader" (
    "id" SERIAL NOT NULL,
    "rank" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "team" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "season" TEXT NOT NULL,

    CONSTRAINT "AssistLeader_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShotLeader" (
    "id" SERIAL NOT NULL,
    "rank" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "team" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "season" TEXT NOT NULL,

    CONSTRAINT "ShotLeader_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChancesCreatedLeader" (
    "id" SERIAL NOT NULL,
    "rank" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "team" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "season" TEXT NOT NULL,

    CONSTRAINT "ChancesCreatedLeader_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PassLeader" (
    "id" SERIAL NOT NULL,
    "rank" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "team" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "season" TEXT NOT NULL,

    CONSTRAINT "PassLeader_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CrossLeader" (
    "id" SERIAL NOT NULL,
    "rank" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "team" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "season" TEXT NOT NULL,

    CONSTRAINT "CrossLeader_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CleanSheetLeader" (
    "id" SERIAL NOT NULL,
    "rank" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "team" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "season" TEXT NOT NULL,

    CONSTRAINT "CleanSheetLeader_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SaveLeader" (
    "id" SERIAL NOT NULL,
    "rank" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "team" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "season" TEXT NOT NULL,

    CONSTRAINT "SaveLeader_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClearanceLeader" (
    "id" SERIAL NOT NULL,
    "rank" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "team" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "season" TEXT NOT NULL,

    CONSTRAINT "ClearanceLeader_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "YellowCardLeader" (
    "id" SERIAL NOT NULL,
    "rank" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "team" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "season" TEXT NOT NULL,

    CONSTRAINT "YellowCardLeader_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RedCardLeader" (
    "id" SERIAL NOT NULL,
    "rank" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "team" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "season" TEXT NOT NULL,

    CONSTRAINT "RedCardLeader_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LiveScores" (
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
