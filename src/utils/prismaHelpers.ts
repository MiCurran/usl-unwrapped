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

/**
 * The function retrieves the recent match statistics between two USL teams using their team IDs.
 * @param {number} uslTeamId1 - The `uslTeamId1` parameter is the ID of the first USL team. It is a
 * number that uniquely identifies the team in the database.
 * @param {number} uslTeamId2 - The `uslTeamId2` parameter is the ID of the second USL team. It is used
 * to filter the matches and find recent match statistics between the two teams specified by
 * `uslTeamId1` and `uslTeamId2`.
 * @param {any} prisma - The `prisma` parameter is an instance of the Prisma Client, which is a
 * database toolkit that provides an auto-generated query builder and an ORM for Node.js and
 * TypeScript. It allows you to interact with your database using a type-safe API.
 * @returns an array of recent matches between two teams.
 */
export async function getRecentMatchStatsBetweenTwoTeams(uslTeamId1: number, uslTeamId2: number, prisma: any) {
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

export async function seedStatLeaders() {
}