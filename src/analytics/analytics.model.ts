import { ObjectType, Field } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { MatchModel } from 'src/matches/matches.model';

@ObjectType({ description: 'Stats from the past 5 matches' })
class PastFiveGameStats {
  @Field()
  @ApiProperty({ description: 'Total goals scored' })
  totalGoalsScored: number;

  @Field()
  @ApiProperty({ description: 'Matches with more than one goal' })
  matchesWithMoreThanOneGoal: number;

  @Field()
  @ApiProperty({ description: 'Clean sheets' })
  cleanSheets: number;

  @Field()
  @ApiProperty({ description: 'Shots vs. target' })
  shotsVsTarget: string;

  @Field()
  @ApiProperty({ description: 'Long ball percentage' })
  longBallPercentage: string;

  @Field()
  @ApiProperty({ description: 'Average passing accuracy' })
  averagePassingAccuracy: string;

  @Field()
  @ApiProperty({ description: 'Average crossing accuracy' })
  averageCrossingAccuracy: string;

  @Field()
  @ApiProperty({ description: 'Possession plus-minus' })
  possessionPlusMinus: string;
}

@ObjectType({ description: 'Team Stats & Info' })
class AnalyzedTeam {
  @Field()
  @ApiProperty({ description: 'Team name' })
  teamName: string;

  @Field(() => PastFiveGameStats)
  @ApiProperty({ type: PastFiveGameStats, description: 'Team stats from previous 5 matches' })
  pastFiveMatchStats: PastFiveGameStats;

  @Field(() => MatchModel)
  @ApiProperty({description: 'An array of match data for the past 5 matches'})
  matchData: MatchModel[]
}

@ObjectType({ description: 'Stats from the past 5 matches for the two provided UslTeamId' })
export class AnalyticsModel {
  @Field(() => AnalyzedTeam)
  @ApiProperty({ type: AnalyzedTeam, description: 'Team one info & stats' })
  teamOne: AnalyzedTeam;

  @Field(() => AnalyzedTeam)
  @ApiProperty({ type: AnalyzedTeam, description: 'Team two info & stats' })
  teamTwo: AnalyzedTeam;
}