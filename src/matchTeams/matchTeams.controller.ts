
import { Controller, Get, Param } from '@nestjs/common';
import { MatchTeamsService } from './matchTeams.service';
import { MatchEvents, UslTeams, Prisma, MatchTeam } from '.prisma/client';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger'; // Import Swagger decorators

@ApiTags('Match Teams') 
@Controller('match-teams')
export class MatchTeamsController {
  constructor(private readonly matchTeamsService: MatchTeamsService) {}


// we need to update the return types here

  @Get()
  @ApiOperation({ summary: 'Match Team Info' })
  @ApiResponse({ status: 200, description: 'Returns an array of Match Teams' })
  findAll(): Promise<MatchTeam[]> {
    return this.matchTeamsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get Match Team by ID' })
  @ApiParam({ name: 'id', type: 'integer', required: true }) // Document the route parameter
  @ApiResponse({ status: 200, description: 'Returns a specific match team by id' })
  @ApiResponse({ status: 404, description: 'Team not found.' })
  findOne(@Param('id') id: string): Promise<MatchTeam | null> {
    return this.matchTeamsService.findOne(+id);
  }
}
