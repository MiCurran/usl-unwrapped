
import { Controller, Get, Param, Query } from '@nestjs/common';
import { TeamsService, UslTeam } from './teams.service';
import { MatchEvents, UslTeams, Prisma, MatchTeam, Match } from '.prisma/client';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger'; // Import Swagger decorators
import { MatchesService } from 'src/matches/matches.service';
import { MatchTeamsService } from 'src/matchTeams/matchTeams.service';

@ApiTags('USL TEAMS') 
@Controller('teams')
export class TeamsController {
  constructor(
    private readonly teamsService: TeamsService,
    private readonly matchesService: MatchesService,
    private readonly matchTeamsService: MatchTeamsService
    ) {}
  @Get()
  @ApiOperation({ summary: 'Get all USL Teams' })
  @ApiResponse({ status: 200, description: 'Returns an array of USL Teams and their IDs', type: [UslTeam] })
  findAll(): Promise<UslTeam[]> {
    return this.teamsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get USL Team by ID' })
  @ApiParam({ name: 'id', type: 'integer', required: true }) // Document the route parameter
  @ApiResponse({ status: 200, description: 'Returns a USL team by MatchID if found.', type: UslTeam })
  @ApiResponse({ status: 404, description: 'USL Team not found.' })
  findOne(@Param('id') id: string): Promise<UslTeam | null> {
    return this.teamsService.findOne(+id);
  }

  @Get(':uslTeamId/matches')
  @ApiOperation({ summary: 'Get matches by team ID' })
  @ApiQuery({ name: 'home/away', type: String, required: false }) // Document the query parameter as optional
  @ApiParam({ name: 'uslTeamId', type: 'integer', required: true }) // Document the route parameter
  @ApiResponse({ status: 200, description: 'Returns matches for a team.' })
  findByTeam(
    @Query('home/away') home_away: string,
    @Param('uslTeamId') uslTeamId: string
    ): Promise<Match[]> {
    return this.matchesService.findByTeam(+uslTeamId, home_away);
  }

  @Get(':uslTeamOneId/matches/:uslTeamTwoId')
  @ApiOperation({ summary: 'Get matches between two teams' })
  @ApiParam({ name: 'uslTeamOneId', type: 'integer', required: true }) // Document the route parameter
  @ApiParam({ name: 'uslTeamTwoId', type: 'integer', required: true }) // Document the route parameter
  @ApiResponse({ status: 200, description: 'Returns 5 recent matches between two teams.' })
  findMatchesBetweenTeams(@Param('uslTeamOneId') uslTeamOneId: string, @Param('uslTeamTwoId') uslTeamTwoId: string): Promise<Match[]> {
    return this.matchesService.findBetweenTeams(+uslTeamOneId, +uslTeamTwoId);
  }

@Get(':id/match-teams')
  @ApiOperation({ summary: 'Get match teams and lineups by team ID' })
  @ApiParam({ name: 'id', type: 'integer', required: true }) // Document the route parameter
  @ApiResponse({ status: 200, description: 'Returns an array of match teams and lineups for a team.' })
  findTeamsByTeam(@Param('id') teamId: string): Promise<MatchTeam[]> {
    return this.matchTeamsService.findByTeam(+teamId);
  }
}
