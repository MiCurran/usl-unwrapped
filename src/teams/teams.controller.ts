
import { Controller, Get, Param } from '@nestjs/common';
import { TeamsService, UslTeam } from './teams.service';
import { MatchEvents, UslTeams, Prisma, MatchTeam, Match } from '.prisma/client';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger'; // Import Swagger decorators
import { MatchesService } from 'src/matches/matches.service';

@ApiTags('USL TEAMS') 
@Controller('teams')
export class TeamsController {
  constructor(
    private readonly teamsService: TeamsService,
    private readonly matchesService: MatchesService
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

  @Get(':id/matches')
  @ApiOperation({ summary: 'Get matches by team ID' })
  @ApiParam({ name: 'teamId', type: 'integer', required: true }) // Document the route parameter
  @ApiResponse({ status: 200, description: 'Returns matches for a team.' })
  findByTeam(@Param('teamId') teamId: string): Promise<Match[]> {
    return this.matchesService.findByTeam(+teamId);
  }

  @Get(':id/match-teams')
  @ApiOperation({ summary: 'Get matches teams and lineups by team ID' })
  @ApiParam({ name: 'teamId', type: 'integer', required: true }) // Document the route parameter
  @ApiResponse({ status: 200, description: 'Returns an array of match teams and lineups for a team.' })
  findTeamsByTeam(@Param('teamId') teamId: string): Promise<MatchTeam[]> {
    return null
    ;this.matchesService.findByTeam(+teamId);
  }
}
