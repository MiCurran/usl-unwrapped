import { PrismaClient, Prisma } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const uslTeams = [
  { name: "Pittsburgh Riverhounds SC", conference: "Eastern" },
  { name: "Tampa Bay Rowdies", conference: "Eastern" },
  { name: "Charleston Battery", conference: "Eastern" },
  { name: "Louisville City FC", conference: "Eastern" },
  { name: "Memphis 901 FC", conference: "Eastern" },
  { name: "Indy Eleven", conference: "Eastern" },
  { name: "Birmingham Legion FC", conference: "Eastern" },
  { name: "FC Tulsa", conference: "Eastern" },
  { name: "Detroit City FC", conference: "Eastern" },
  { name: "The Miami FC", conference: "Eastern" },
  { name: "Loudoun United FC", conference: "Eastern" },
  { name: "Hartford Athletic", conference: "Eastern" },
  { name: "Sacramento Republic FC", conference: "Western" },
  { name: "San Antonio FC", conference: "Western" },
  { name: "Orange County SC", conference: "Western" },
  { name: "San Diego Loyal", conference: "Western" },
  { name: "Phoenix Rising FC", conference: "Western" },
  { name: "Oakland Roots", conference: "Western" },
  { name: "Colorado Springs Switchbacks FC", conference: "Western" },
  { name: "El Paso Locomotive FC", conference: "Western" },
  { name: "Monterey Bay", conference: "Western" },
  { name: "New Mexico United", conference: "Western" },
  { name: "Rio Grande Valley FC", conference: "Western" },
  { name: "Las Vegas Lights FC", conference: "Western" }
];
const prisma = new PrismaClient()
// pull seed data from a directory of JSON files
// run a for loop for each of the files
// each file should create a match
// each file creates two matchTeams

async function processAllFilesInDirectory(directoryPath) {
  try {
    const files = fs.readdirSync(directoryPath);

    for (const file of files) {
      if (file.endsWith('.json')) {
        const filePath = path.join(directoryPath, file);
        console.log(filePath);
        const jsonData = require(`../${filePath}`);
        await createMatchFromJSON(jsonData);
        console.log(`Processed file: ${file}`);
      }
    }
  } catch (error) {
    console.error('Error processing files:', error);
  } finally {
    await prisma.$disconnect();
  }
}

async function main() {
  console.log(`Start seeding ...`);
  await seedUslTeams(uslTeams);

  const directoryPath = './mock/2023-week-26'; // Replace with the actual directory path
  await processAllFilesInDirectory(directoryPath);

  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

  async function seedUslTeams(teams) {
    try {
      for (const team of teams) {
        await prisma.uslTeams.create({
          data: {
            name: team.name,
            conference: team.conference,
          },
        });
        console.log(`Inserted team: ${team.name}`);
      }
    } catch (error) {
      console.error('Error seeding UslTeams:', error);
    }
  }

  async function createMatchFromJSON(data) {
    try {
     const getMatchDetails = async () => { 
      const matchTeams = [];
      const homeTeamIndex = uslTeams.findIndex((team) => team.name === data.matchDetails[0].homeTeam);
      const awayTeamIndex = uslTeams.findIndex((team) => team.name === data.matchDetails[1].awayTeam);

        for (const matchDetail of data.matchDetails) {
          const matchTeam = await prisma.matchTeam.create({
            data: {
              name: matchDetail.homeTeam || matchDetail.awayTeam,
              formation: matchDetail.formation || 'n/a',
              score: matchDetail.score || 'n/a',
              lineup: matchDetail.lineup.players.map((player) => ({
                shirtNumber: player.shirtNumber,
                playerName: player.playerName,
                playerPosition: player.playerPosition,
                playerEvents: player.playerEvents
              })),
              uslTeamId: matchDetail.homeTeam ? homeTeamIndex : awayTeamIndex
            },
          })
        for (const player of matchDetail.lineup.players) {
              await prisma.matchPlayer.create({
              data: {
                ...player,
                matchTeamId: matchTeam.id
              }
          })
        }
        matchTeams.push(matchTeam)
      };
      return matchTeams;
    }
        //need events and stats to create match
        const matchDetails = await getMatchDetails();
        console.log(matchDetails);
        const stats = data.stats;
        const events = data.events;
        // Create Match
        const createMatch = async () => {
          const match = await prisma.match.create({
          data: {
            homeTeamId: await matchDetails[0].id,
            awayTeamId: await matchDetails[1].id,
            homeTeamUslId: await matchDetails[0].uslTeamId,
            awayTeamUslId: await matchDetails[1].uslTeamId,
            score: `${await matchDetails[0].score}-${await matchDetails[1].score}`,
            stats: stats
          },
        });
        return match;
      }
        const match = await createMatch();
          await prisma.matchEvents.create({
            data: {
              events: events,
              matchId: match.id
            }
          })  
    } catch (error) {
      console.error('Error creating records:', error);
    } finally {
      await prisma.$disconnect();
    }
  }