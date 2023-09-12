-- CreateTable
CREATE TABLE "MatchTeam" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "formation" TEXT NOT NULL,
    "score" TEXT NOT NULL,
    "lineupId" INTEGER NOT NULL,

    CONSTRAINT "MatchTeam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MatchPlayer" (
    "id" SERIAL NOT NULL,
    "shirtNumber" TEXT NOT NULL,
    "playerName" TEXT NOT NULL,
    "playerPosition" TEXT NOT NULL,
    "lineupId" INTEGER,

    CONSTRAINT "MatchPlayer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlayerEvent" (
    "id" SERIAL NOT NULL,
    "event" TEXT NOT NULL,
    "eventTime" TEXT NOT NULL,
    "playerId" INTEGER NOT NULL,

    CONSTRAINT "PlayerEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lineup" (
    "id" SERIAL NOT NULL,
    "managerName" TEXT NOT NULL,
    "teamId" INTEGER NOT NULL,

    CONSTRAINT "Lineup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Match" (
    "id" SERIAL NOT NULL,
    "homeTeamId" INTEGER NOT NULL,
    "awayTeamId" INTEGER NOT NULL,
    "score" TEXT NOT NULL,
    "stats" JSONB NOT NULL,

    CONSTRAINT "Match_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MatchEvent" (
    "id" SERIAL NOT NULL,
    "time" TEXT NOT NULL,
    "event" TEXT NOT NULL,
    "matchId" INTEGER NOT NULL,

    CONSTRAINT "MatchEvent_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MatchTeam" ADD CONSTRAINT "MatchTeam_lineupId_fkey" FOREIGN KEY ("lineupId") REFERENCES "Lineup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchPlayer" ADD CONSTRAINT "MatchPlayer_lineupId_fkey" FOREIGN KEY ("lineupId") REFERENCES "Lineup"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerEvent" ADD CONSTRAINT "PlayerEvent_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "MatchPlayer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchEvent" ADD CONSTRAINT "MatchEvent_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
