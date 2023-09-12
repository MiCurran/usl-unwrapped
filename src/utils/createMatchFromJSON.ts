const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { Match } = require('../../prisma/schema.prisma');
async function createMatchFromJSON(data) {
  try {
    for (const matchDetail of data.matchDetails) {
      // Create MatchTeam
      const matchTeam = await prisma.matchTeam.create({
        data: {
          name: matchDetail.homeTeam || matchDetail.awayTeam,
          formation: matchDetail.formation,
          score: matchDetail.score,
          // Other fields
        },
      });

      // Create Lineup
      const lineup = await prisma.lineup.create({
        data: {
          managerName: matchDetail.lineup.managerName,
          teamId: matchTeam.id,
          players: {
            createMany: {
              data: matchDetail.lineup.players.map((player) => ({
                shirtNumber: player.shirtNumber,
                playerName: player.playerName,
                playerPosition: player.playerPosition,
                // Other fields
              })),
            },
          },
        },
      });

      // Create Match
      await prisma.match.create({
        data: {
          homeTeamId: matchTeam.id,
          // Set other Match fields
        },
      });
    }

    // Add code to handle the stats and events data here
  } catch (error) {
    console.error('Error creating records:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Replace 'jsonData' with the actual JSON data from your file
const jsonData = require('./your-json-file.json');
createMatchFromJSON(jsonData);
