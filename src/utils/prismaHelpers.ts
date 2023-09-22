export async function getRecentMatchStats(uslTeamId, prisma) {
    try {
      const recentMatches = await prisma.match.findMany({
        where: {
          OR: [
            { homeTeamUslId: uslTeamId },
            { awayTeamUslId: uslTeamId },
          ],
        },
        orderBy: {
          date: 'desc',
        },
        take: 5,
      });
  
      return recentMatches;
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
export async function getRecentMatchStatsBetweenTwoTeams(uslTeamId1, uslTeamId2, prisma) {
    try {
      const recentMatches = await prisma.match.findMany({
        where: {
          AND: [
            {
              OR: [
                { homeTeamUslId: uslTeamId1, awayTeamUslId: uslTeamId2 },
                { homeTeamUslId: uslTeamId2, awayTeamUslId: uslTeamId1 },
              ],
            },
          ],
        },
        orderBy: {
          date: 'desc',
        },
        take: 5,
      });
  
      return recentMatches;
    } catch (error) {
      console.error('Error:', error);
    }
  }