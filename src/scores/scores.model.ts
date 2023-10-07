import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { LiveScores, Match } from '@prisma/client';
import { JsonObject, JsonValue } from '@prisma/client/runtime/library';
//we need to update every object field here

@ObjectType({ description: 'General Team stats' })
class GenTeamStats {
  @Field()
  Possession: string;

  @Field()
  Duels_Success_Rate: string;

  @Field()
  Ariel_Duels_Won: string;

  @Field()
  Interceptions: string;

  @Field()
  Offsides: string;

  @Field()
  Corners_Won: string;
}

@ObjectType({ description: 'Distribution Team stats' })
class DistTeamStats {
  @Field()
  Passes: string;

  @Field()
  Long_Passes: string;

  @Field()
  Passing_Accuracy: string;

  @Field()
  Passing_Accuracy_In_Opponent_Half: string;

  @Field()
  Crosses: string;

  @Field()
  Crossing_Accuracy: string;
}

@ObjectType({ description: 'Attack Team stats' })
class AttackTeamStats  {
  @Field()
  Goals: string;

  @Field()
  Shots: string;

  @Field()
  Shots_On_Target: string;

  @Field()
  Blocked_Shots: string;

  @Field()
  Shots_Outside_Box: string;

  @Field()
  Shots_Inside_Box: string;

  @Field()
  Shooting_Accuracy: string;
}

@ObjectType({ description: 'Defense Team stats' })
class DefenseTeamStats {
  @Field()
  Tackles: string;

  @Field()
  Tackle_Success_Rate: string;

  @Field()
  Clearances: string;
}
@ObjectType({ description: 'Discipline Team stats' })
class DisciplineTeamStats {
  @Field()
  Fouls_Conceded: string;

  @Field()
  Yellow_Cards: string;

  @Field()
  Red_Cards: string;
}

@ObjectType({ description: 'General stats' })
class GeneralStats {
  @Field()
  home: GenTeamStats;

  @Field()
  away: GenTeamStats;
}

@ObjectType({ description: 'Distribution stats' })
class DistributionStats {
  @Field()
  home: DistTeamStats;

  @Field()
  away: DistTeamStats;
}

@ObjectType({ description: 'Attack stats' })
class AttackStats {
  @Field()
  home: AttackTeamStats;

  @Field()
  away: AttackTeamStats;
}

@ObjectType({ description: 'Defense stats' })
class DefenseStats {
  @Field()
  home: DefenseTeamStats;

  @Field()
  away: DefenseTeamStats;
}

@ObjectType({ description: 'Discipline stats' })
class DisciplineStats {
  @Field()
  home: DisciplineTeamStats;

  @Field()
  away: DisciplineTeamStats;
}

@ObjectType({ description: 'Stats' })
class Stats {
  @Field()
  GENERAL_STATS: GeneralStats;

  @Field()
  DISTRIBUTION_STATS: DistributionStats;

  @Field()
  ATTACK_STATS: AttackStats;

  @Field()
  DEFENSE_STATS: DefenseStats;

  @Field()
  DISCIPLINE_STATS: DisciplineStats;
}


@ObjectType({ description: 'Live Score' })
export class LiveScoreModel implements LiveScores {
  @Field((type) => ID)
  @ApiProperty({ description: 'The unique identifier of the match.' })
  id: number;

  @Field()
  @ApiProperty({ description: 'The date of the match.' })
  date: Date;

  @Field()
  @ApiProperty({ description: 'The USL ID of the home team.' })
  homeTeamUslId: number;

  @Field()
  @ApiProperty({ description: 'The USL ID of the away team.' })
  awayTeamUslId: number;

  @Field()
  @ApiProperty({ description: 'The home team score' })
  homeTeamScore: string;

  @Field()
  @ApiProperty({ description: 'The away team score' })
  awayTeamScore: string;

  @Field()
  @ApiProperty({ description: 'The score of the match.' })
  score: string;

  // Add missing properties
  @Field()
  @ApiProperty({ description: 'The name of the home team.' })
  homeTeamName: string;

  @Field()
  @ApiProperty({ description: 'The name of the away team.' })
  awayTeamName: string;

  @Field((type) => Stats)
  @ApiProperty({type: Stats, description: 'Statistics for the match.' })
  stats:  any;
}