const { PrismaClient } = require('@prisma/client');


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
  { name: "Las Vegas Lights FC", conference: "Western" },
  { name: "New York Red Bulls II", conference: "Eastern", active: false },
  { name: "Atlanta United 2", conference: "Eastern", active: false },
  { name: "LA Galaxy II", conference: "Western", active: false },
  { name: "Tacoma Defiance", conference: "Western", active: false},
  { name: "REAL MONARCHS SLC", conference: "Western", active: false},
  { name: "Austin Bold", conference: "Western", active: false},
  { name: "Charlotte Independence", conference: "Eastern", active: false},
  { name: "Oklahoma City Energy", conference: "Western", active: false},
  { name: "St Louis FC", conference: "Eastern", active: false},
  { name: "PORTLAND TIMBERS 2", conference: "Western", active: false},
  { name: "North Carolina FC", conference: "Eastern", active: false},
  { name: "Philidalphia Union II", conference: "Eastern", active: false},
  { name: "Reno 1868 FC", conference: "Western", active: false},
  { name: "Swope Park Rangers", conference: "Eastern", active: false},
  { name: "Ottawa Fury FC", conference: "Eastern", active: false},
  { name: "Fresno FC", conference: "Western", active: false},
  { name: "Tulsa Roughnecks FC", conference: "Western", active: false},
  { name: "Bethlehem Steel FC", conference: "Eastern", active: false}
];

export async function createMatchFromJSON(data, prisma): Promise<typeof PrismaClient.Match> {
  try {
    const poppedDate = data.matchDetails[2];
    const date = poppedDate ? new Date(poppedDate.date) : new Date(2000, 0, 1); // January is represented as 0 (zero-based index);
    // Extract the season from the date string
    const season = date.getFullYear().toString();    
const getMatchDetails = async () => {
      const matchTeams = [];
      const homeTeamIndex = uslTeams.findIndex((team) => team.name === data.matchDetails[0].homeTeam) + 1;
      const awayTeamIndex = uslTeams.findIndex((team) => team.name === data.matchDetails[1].awayTeam) + 1;

      for (let i = 0; i < 2; i++) {
        if (data.matchDetails[i]) {
          const matchDetail = data.matchDetails[i];
          const matchTeam = await prisma.matchTeam.create({
            data: {
              name: matchDetail.homeTeam || matchDetail.awayTeam,
              formation: matchDetail.formation || 'n/a',
              score: matchDetail.score || 'n/a',
              lineup: matchDetail.lineup.players.map((player) => ({
                shirtNumber: player.shirtNumber,
                playerName: player.playerName,
                playerPosition: player.playerPosition,
                playerEvents: player.playerEvents,
              })),
              uslTeamId: matchDetail.homeTeam ? homeTeamIndex : awayTeamIndex,
            },
          });
          for (const player of matchDetail.lineup.players) {
            await prisma.matchPlayer.create({
              data: {
                ...player,
                matchTeamId: matchTeam.id,
              },
            });
          }
          matchTeams.push(matchTeam);
        }
      }
      return matchTeams;
    };
    const matchDetails = await getMatchDetails();
    //console.log('this is matchDetails', matchDetails)
    //EVERYTHING STILL LOGS CORRECTLY HERE
   // console.log('this would make this a match', data.matchDetails, data.stats, matchDetails)
    const stats = data.stats;
    const events = data.events;
    const existingMatch = await prisma.match.findFirst({
      where: {
        date: date,
        homeTeamUslId: matchDetails[0].uslTeamId,
        awayTeamUslId: matchDetails[1].uslTeamId
      }
    })
    if (existingMatch) {
      console.log(`Match already exists: ${existingMatch.id}`);
      return existingMatch;
    }

    const createMatch = async () => {
      const match = await prisma.match.create({
        data: {
          date: date,
          season: season,
          homeTeamId: matchDetails[0].id,
          awayTeamId: matchDetails[1].id,
          homeTeamUslId: matchDetails[0].uslTeamId,
          awayTeamUslId: matchDetails[1].uslTeamId,
          homeTeamScore: matchDetails[0].score,
          awayTeamScore: matchDetails[1].score,
          score: `${matchDetails[0].score}-${matchDetails[1].score}`,
          stats: stats,
        },
      });
      matchDetails.length = 0;
      console.log('created this match',match)
      return match;
    };

    const match = await createMatch();
    //console.log(match);
    await prisma.matchEvents.create({
      data: {
        events: events,
        matchId: match.id,
      },
    });
    return match;
  } catch (error) {
    console.error('Error creating records:', error);
  }
}