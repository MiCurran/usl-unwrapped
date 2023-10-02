
import { Controller, Get, Param, ParseIntPipe, Query, UseGuards } from '@nestjs/common';
import { MatchTeamsService } from './matchTeams.service';
import { MatchEvents, UslTeams, Prisma, MatchTeam } from '.prisma/client';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiUnauthorizedResponse } from '@nestjs/swagger'; // Import Swagger decorators
import { AuthorizationGuard } from 'src/authorization/authorization.guard';

@ApiTags('Match Teams') 
@Controller('match-teams')
export class MatchTeamsController {
  constructor(private readonly matchTeamsService: MatchTeamsService) {}


// we need to update the return types here

  @Get()
  @UseGuards(AuthorizationGuard)
  @ApiOperation({ summary: 'Match Team Info' })
  //@ApiQuery({ name: 'season', type: String, required: false }) // Document the query parameter as optional
  @ApiUnauthorizedResponse({status: 401, description: 'Bearer Key'})
  @ApiResponse({ status: 200, description: 'Returns an array of Match Teams' })
  findAll(): Promise<MatchTeam[]> {
    return this.matchTeamsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get Match Team by ID' })
  @ApiParam({ name: 'id', type: 'integer', required: true }) // Document the route parameter
  //@ApiQuery({ name: 'season', type: String, required: false }) // Document the query parameter as optional
  @ApiResponse({ status: 200, description: 'Returns a specific match team by id' })
  @ApiResponse({ status: 404, description: 'Team not found.' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<MatchTeam | null> {
    return this.matchTeamsService.findOne(id);
  }
}
