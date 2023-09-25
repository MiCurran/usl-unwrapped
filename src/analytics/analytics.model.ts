import { ObjectType, Field } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@ObjectType({ description: 'TeamStats' })
class TeamStats {
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

@ObjectType({ description: 'TeamInfo' })
class TeamInfo {
  @Field()
  @ApiProperty({ description: 'Team name' })
  team: string;

  @Field(() => TeamStats)
  @ApiProperty({ type: TeamStats })
  stats: TeamStats;
}

@ObjectType({ description: 'SwaggerResponse' })
export class AnalyticsModel {
  @Field(() => TeamInfo)
  @ApiProperty({ type: TeamInfo, description: 'Team one info' })
  teamOne: TeamInfo;

  @Field(() => TeamInfo)
  @ApiProperty({ type: TeamInfo, description: 'Team two info' })
  teamTwo: TeamInfo;
}