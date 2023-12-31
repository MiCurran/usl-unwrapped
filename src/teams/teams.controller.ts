
import { Controller, Get, Param, ParseIntPipe, Query, UseInterceptors } from '@nestjs/common';
import { TeamsService, UslTeam } from './teams.service';
import { MatchEvents, UslTeams, Prisma, MatchTeam, Match } from '.prisma/client';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger'; // Import Swagger decorators
import { MatchesService } from 'src/matches/matches.service';
import { MatchTeamsService } from 'src/matchTeams/matchTeams.service';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
type UslId = Exclude<number, 0 | 42>;
enum UslIdEnum {
  One = 1,
  Two,
  Three,
  Four,
  Five,
  Six,
  Seven,
  Eight,
  Nine,
  Ten,
  Eleven,
  Twelve,
  Thirteen,
  Fourteen,
  Fifteen,
  Sixteen,
  Seventeen,
  Eighteen,
  Nineteen,
  Twenty,
  TwentyOne,
  TwentyTwo,
  TwentyThree,
  TwentyFour,
  TwentyFive,
  TwentySix,
  TwentySeven,
  TwentyEight,
  TwentyNine,
  Thirty,
  ThirtyOne,
  ThirtyTwo,
  ThirtyThree,
  ThirtyFour,
  ThirtyFive,
  ThirtySix,
  ThirtySeven,
  ThirtyEight,
  ThirtyNine,
  Forty,
  FortyOne,
  FortyTwo,
}

enum Where {
  home = 'home',
  away = 'away'
}

@Controller('teams')
export class TeamsController {
  constructor(
    private readonly teamsService: TeamsService,
    private readonly matchesService: MatchesService,
    private readonly matchTeamsService: MatchTeamsService
    ) {}
    @ApiTags('USL TEAMS') 
  @Get()
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(3600)
  @ApiOperation({ summary: 'Get all USL Teams' })
  @ApiResponse({ status: 200, description: 'Returns an array of USL Teams and their IDs', type: [UslTeam] })
  findAll(): Promise<UslTeam[]> {
    return this.teamsService.findAll();
  }

  @ApiTags('USL TEAMS') 
  @Get(':uslTeamId')
  @ApiOperation({ summary: 'Get USL Team by ID' })
  @ApiParam({ name: 'uslTeamId', type: 'integer', required: true, enum: UslIdEnum  })
  @ApiResponse({ status: 200, description: 'Returns a USL team by USL team id if found.', type: UslTeam })
  @ApiResponse({ status: 404, description: 'USL Team not found.' })
  findOne(@Param('uslTeamId', ParseIntPipe) uslTeamId: UslId): Promise<UslTeam | null> {
    return this.teamsService.findOne(uslTeamId);
  }

  @ApiTags('USL TEAMS') 
  @Get(':uslTeamId/matches')
  @ApiOperation({ summary: 'Get matches by USL team ID' })
  @ApiQuery({ name: 'home/away', type: 'string', required: false, enum: Where })
  @ApiParam({ name: 'uslTeamId', type: 'integer', required: true, enum: UslIdEnum })
  @ApiResponse({ status: 200, description: 'Returns matches for a team.' })
  findByTeam(
    @Query('home/away') home_away: string,
    @Param('uslTeamId', ParseIntPipe) uslTeamId: UslId
    ): Promise<Match[]> {
    return this.matchesService.findByTeam(uslTeamId, home_away);
  }

  @ApiTags('USL TEAMS') 
@Get(':uslTeamId/match-teams')
  @ApiOperation({ summary: 'Get match teams and lineups by USL team ID' })
  @ApiParam({ name: 'uslTeamId', type: 'integer', required: true, enum: UslIdEnum })
  @ApiResponse({ status: 200, description: 'Returns an array of match teams and lineups for a team.' })
  findTeamsByTeam(@Param('uslTeamId') uslTeamId: string): Promise<MatchTeam[]> {
    return this.matchTeamsService.findByTeam(+uslTeamId);
  }

  @ApiTags('Analytics') 
  @Get(':uslTeamOneId/matches/:uslTeamTwoId')
  @ApiOperation({ summary: 'Get matches between two teams' })
  @ApiParam({ name: 'uslTeamOneId', type: 'integer', required: true, enum: UslIdEnum })
  @ApiParam({ name: 'uslTeamTwoId', type: 'integer', required: true, enum: UslIdEnum }) 
  @ApiResponse({ status: 200, description: 'Returns 5 recent matches between two teams.' })
  findMatchesBetweenTeams(
    @Param('uslTeamOneId') uslTeamOneId: UslId, 
    @Param('uslTeamTwoId') uslTeamTwoId: UslId
    ): Promise<Match[]> {
    return this.matchesService.findBetweenTeams(+uslTeamOneId, +uslTeamTwoId);
  }
}
