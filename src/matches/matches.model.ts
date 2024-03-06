import { ApiProperty } from '@nestjs/swagger';
import { Match } from '@prisma/client';
import { JsonObject, JsonValue } from '@prisma/client/runtime/library';
//we need to update every object field here

class GenTeamStats {
  Possession: string;

  
  Duels_Success_Rate: string;

  
  Ariel_Duels_Won: string;

  
  Interceptions: string;

  
  Offsides: string;

  
  Corners_Won: string;
}

class DistTeamStats {
  
  Passes: string;

  
  Long_Passes: string;

  
  Passing_Accuracy: string;

  
  Passing_Accuracy_In_Opponent_Half: string;

  
  Crosses: string;

  
  Crossing_Accuracy: string;
}

class AttackTeamStats  {
  
  Goals: string;

  
  Shots: string;

  
  Shots_On_Target: string;

  
  Blocked_Shots: string;

  
  Shots_Outside_Box: string;

  
  Shots_Inside_Box: string;

  
  Shooting_Accuracy: string;
}

class DefenseTeamStats {
  
  Tackles: string;

  
  Tackle_Success_Rate: string;

  
  Clearances: string;
}
class DisciplineTeamStats {
  
  Fouls_Conceded: string;

  
  Yellow_Cards: string;

  
  Red_Cards: string;
}

class GeneralStats {
  
  home: GenTeamStats;

  
  away: GenTeamStats;
}

class DistributionStats {
  
  home: DistTeamStats;

  
  away: DistTeamStats;
}

class AttackStats {
  
  home: AttackTeamStats;

  
  away: AttackTeamStats;
}

class DefenseStats {
  
  home: DefenseTeamStats;

  
  away: DefenseTeamStats;
}

class DisciplineStats {
  
  home: DisciplineTeamStats;

  
  away: DisciplineTeamStats;
}

class Stats {
  
  GENERAL_STATS: GeneralStats;

  
  DISTRIBUTION_STATS: DistributionStats;

  
  ATTACK_STATS: AttackStats;

  
  DEFENSE_STATS: DefenseStats;

  
  DISCIPLINE_STATS: DisciplineStats;
}


export class MatchModel implements Match {
  @ApiProperty({ description: 'The unique identifier of the match.' })
  id: number;

  
  @ApiProperty({ description: 'The date of the match.' })
  date: Date;

  
  @ApiProperty({ description: 'The season of the match.' })
  season: string;

  
  @ApiProperty({ description: 'The ID of the home team.' })
  homeTeamId: number;

  
  @ApiProperty({ description: 'The ID of the away team.' })
  awayTeamId: number;

  @ApiProperty({ description: 'The USL ID of the home team.' })
  homeTeamUslId: number;

  
  @ApiProperty({ description: 'The USL ID of the away team.' })
  awayTeamUslId: number;

  
  @ApiProperty({ description: 'The home team score' })
  homeTeamScore: string;

  
  @ApiProperty({ description: 'The away team score' })
  awayTeamScore: string;

  
  @ApiProperty({ description: 'The score of the match.' })
  score: string;

  @ApiProperty({ type: [Event] })
  @ApiProperty({type: Stats, description: 'Statistics for the match.' })
  stats:  any;
}