import { Injectable } from '@nestjs/common';
import { Match } from '@prisma/client';
import { MatchesService } from 'src/matches/matches.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AnalyticsService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly matchesService: MatchesService,
        ) {}

    async analyzeBetweenTeams (uslTeamOneId: number, uslTeamTwoId: number): Promise<any | null> {

        const uslTeamOneData = (await this.matchesService.findByTeam(uslTeamOneId)).slice(0,5)
        const uslTeamTwoData = (await this.matchesService.findByTeam(uslTeamTwoId)).slice(0,5)
        const teamOneName = (await this.prisma.uslTeams.findFirst({where: {id: uslTeamOneId}})).name;
        const teamTwoName = (await this.prisma.uslTeams.findFirst({where: {id: uslTeamTwoId}})).name 
        const data = {team1: uslTeamOneData, team2: uslTeamTwoData}
        return {
            teamOne: {team: teamOneName, pastFiveMatchStats: analyzeDataForTeam(data.team1, uslTeamOneId), matchData: uslTeamOneData},
            teamTwo: {team: teamTwoName, pastFiveMatchStats: analyzeDataForTeam(data.team2, uslTeamTwoId), matchData: uslTeamTwoData},
        }
      }
}

function getTeamScore(matches: Match[], uslTeamId: number) {
    const scores = [];
  
    for (const match of matches) {
      if (match.homeTeamUslId === uslTeamId) {
        const score = parseInt(match.homeTeamScore);
  
        if (!isNaN(score)) {
          scores.push(score);
        }
      } else if (match.awayTeamUslId === uslTeamId) {
        const score = parseInt(match.awayTeamScore);
  
        if (!isNaN(score)) {
          scores.push(score);
        }
      }
    }
  
    return scores;
}

function getOpposingTeamScores(matches: Match[], uslTeamId: number) {
    const scores = [];
  
    for (const match of matches) {
      if (match.homeTeamUslId !== uslTeamId && match.homeTeamScore !== "A") {
        const score = parseInt(match.homeTeamScore);
  
        if (!isNaN(score)) {
          scores.push(score);
        }
      } else if (match.awayTeamUslId !== uslTeamId && match.awayTeamScore !== "A") {
        const score = parseInt(match.awayTeamScore);
  
        if (!isNaN(score)) {
          scores.push(score);
        }
      }
    }
  
    return scores;
}

function getTeamStatsForMatch(matches: Match[], uslTeamId: number, statType: string) {
    const stats = [];
    let side = null;

    for (const match of matches) {
        if (match.homeTeamUslId === uslTeamId) {
            side = "home";
        } else if (match.awayTeamUslId === uslTeamId) {
            side = "away";
        }
        if (side === null) {
            continue; // Skip the match if the provided uslTeamId doesn't match either home or away team
        }

        const statsObj = match.stats[statType];
        // Push the stats for the specified side
        if (statsObj) {
            stats.push(statsObj[side]);
        }
    }
    return stats;
}


// Function to calculate the total shots on target
function getTotalShotsOnTarget(data) {
  return data.reduce((total, match) => total + parseInt(match.Shots_On_Target), 0);
}

// Function to calculate the total shots
function getTotalShots(data) {
  return data.reduce((total, match) => total + parseInt(match.Shots), 0);
}

function getTotalPasses(data) {
    return data.reduce((total, match) => total + parseInt(match.Passes), 0);
  }
  
  // Function to calculate the total shots
  function getTotalLongPasses(data) {
    return data.reduce((total, match) => total + parseInt(match.Long_Passes), 0);
  }

// Function to calculate the average of a specific property
function calculateAverage(data, property) {
    const total = data.reduce((sum, match) => sum + parseFloat(match[property]), 0);
    return total / data.length;
  }

  function calculatePossessionDifference(matches) {
    let totalDifference = 0;
  
    for (const match of matches) {
      // Parse the Possession values as floats (remove '%' and convert to float)
      const possession = parseFloat(match.Possession.replace('%', ''));
  
      // Calculate the other team's possession (100% - this team's possession)
      const otherPossession = 100 - possession;
  
      // Calculate the difference and add it to the total
      const difference = possession - otherPossession;
      totalDifference += difference;
    }
  
    return totalDifference;
  }
  


function analyzeDataForTeam(teamData, uslTeamId) {
    const attackStats = getTeamStatsForMatch(teamData, uslTeamId, 'ATTACK_STATS');
    const distributionStats = getTeamStatsForMatch(teamData, uslTeamId, 'DISTRIBUTION_STATS');
    const generalStats = getTeamStatsForMatch(teamData, uslTeamId, 'GENERAL_STATS')
    console.log(generalStats)
    const shots = getTotalShots(attackStats);
    const shotsOnTarget = getTotalShotsOnTarget(attackStats);
    const shotsVsTarget = `${shotsOnTarget}/${shots}`;
    const averageCrossingAccuracy = calculateAverage(distributionStats, 'Crossing_Accuracy').toFixed(1);
    const averagePassingAccuracy = calculateAverage(distributionStats, 'Passing_Accuracy').toFixed(1);
    const passes = getTotalPasses(distributionStats);
    const longPasses = getTotalLongPasses(distributionStats);
    const longPassAverage = ((longPasses / passes) * 100).toFixed(2)
    const possessionPlusMinus = calculatePossessionDifference(generalStats).toFixed(2)
    const r = {
        totalGoalsScored: getTeamScore(teamData, uslTeamId).reduce((acc, currentValue) => acc + currentValue, 0),
        matchesWithMoreThanOneGoal: getTeamScore(teamData, uslTeamId).reduce((acc, currentValue) => currentValue > 1 ? acc + 1 : acc, 0),
        cleanSheets: getOpposingTeamScores(teamData, uslTeamId).reduce((acc, currentValue) => currentValue === 0 ? acc + 1 : acc, 0),
        shotsVsTarget: shotsVsTarget,
        longBallPercentage: `${longPassAverage}%`,
        averagePassingAccuracy: averagePassingAccuracy,
        averageCrossingAccuracy: averageCrossingAccuracy,
        possessionPlusMinus: possessionPlusMinus
    }
    return r;
}


// we should also add form in here where we look at the record for the games 