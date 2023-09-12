/*
  Warnings:

  - You are about to drop the column `lineupId` on the `MatchPlayer` table. All the data in the column will be lost.
  - You are about to drop the column `lineupId` on the `MatchTeam` table. All the data in the column will be lost.
  - You are about to drop the `Lineup` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PlayerEvent` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "MatchEvent" DROP CONSTRAINT "MatchEvent_matchId_fkey";

-- DropForeignKey
ALTER TABLE "MatchPlayer" DROP CONSTRAINT "MatchPlayer_lineupId_fkey";

-- DropForeignKey
ALTER TABLE "MatchTeam" DROP CONSTRAINT "MatchTeam_lineupId_fkey";

-- DropForeignKey
ALTER TABLE "PlayerEvent" DROP CONSTRAINT "PlayerEvent_playerId_fkey";

-- AlterTable
ALTER TABLE "Match" ADD COLUMN     "events" JSONB[];

-- AlterTable
ALTER TABLE "MatchPlayer" DROP COLUMN "lineupId",
ADD COLUMN     "matchTeamId" INTEGER,
ADD COLUMN     "playerEvents" JSONB[];

-- AlterTable
ALTER TABLE "MatchTeam" DROP COLUMN "lineupId",
ADD COLUMN     "lineup" JSONB[];

-- DropTable
DROP TABLE "Lineup";

-- DropTable
DROP TABLE "PlayerEvent";
