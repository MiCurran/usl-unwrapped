import { ApiProperty } from '@nestjs/swagger';
import { MatchModel } from 'src/matches/matches.model';

class PastFiveGameStats {
  @ApiProperty({ description: 'Recent W-D-L record' })
  form: string;

  @ApiProperty({ description: 'Total goals scored' })
  totalGoalsScored: number;

  @ApiProperty({ description: 'Matches with more than one goal' })
  matchesWithMoreThanOneGoal: number;

  @ApiProperty({ description: 'Clean sheets' })
  cleanSheets: number;

  @ApiProperty({ description: 'Shots vs. target' })
  shotsVsTarget: string;

  @ApiProperty({ description: 'Long ball percentage' })
  longBallPercentage: string;

  @ApiProperty({ description: 'Average passing accuracy' })
  averagePassingAccuracy: string;

  @ApiProperty({ description: 'Average crossing accuracy' })
  averageCrossingAccuracy: string;

  @ApiProperty({ description: 'Possession plus-minus' })
  possessionPlusMinus: string;
}

class AnalyzedTeam {
  @ApiProperty({ description: 'Team name' })
  teamName: string;

  @ApiProperty({ type: PastFiveGameStats, description: 'Team stats from previous 5 matches' })
  pastFiveMatchStats: PastFiveGameStats;

  @ApiProperty({description: 'An array of match data for the past 5 matches'})
  matchData: MatchModel[]
}

export class AnalyticsModel {
  @ApiProperty({ type: AnalyzedTeam, description: 'Team one info & stats' })
  teamOne: AnalyzedTeam;

  @ApiProperty({ type: AnalyzedTeam, description: 'Team two info & stats' })
  teamTwo: AnalyzedTeam;
}