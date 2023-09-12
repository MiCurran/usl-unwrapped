/*
  Warnings:

  - You are about to drop the column `events` on the `Match` table. All the data in the column will be lost.
  - You are about to drop the `MatchEvent` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Match" DROP COLUMN "events";

-- DropTable
DROP TABLE "MatchEvent";

-- CreateTable
CREATE TABLE "MatchEvents" (
    "id" SERIAL NOT NULL,
    "events" JSONB[],
    "matchId" INTEGER NOT NULL,

    CONSTRAINT "MatchEvents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApiUsers" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "key" TEXT NOT NULL,
    "calls" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "ApiUsers_pkey" PRIMARY KEY ("id")
);
