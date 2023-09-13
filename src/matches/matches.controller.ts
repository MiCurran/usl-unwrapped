import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { MatchesService } from './matches.service';
import { Match, Prisma } from '.prisma/client';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiUnauthorizedResponse
} from '@nestjs/swagger'; // Import Swagger decorators
import { AuthorizationGuard } from 'src/authorization/authorization.guard';
@ApiTags('Matches') // Add a tag to categorize routes under "Matches"
@Controller('matches')
export class MatchesController {
  constructor(private readonly matchesService: MatchesService) {}

  @Post()
  @UseGuards(AuthorizationGuard)
  @ApiOperation({ summary: 'Create a new match' })
  @ApiResponse({ status: 201, description: 'Returns the created match.' })
  @ApiUnauthorizedResponse({ description: 'Missing Bearer Key' }) // Document the unauthorized response
  async create(@Body() matchData: Match): Promise<Match> {
    const createdMatch = await this.matchesService.create(matchData);
    return createdMatch;
  }

  @Get()
  @ApiOperation({ summary: 'Get all matches' })
  @ApiResponse({ status: 200, description: 'Returns an array of matches.' })
  findAll(): Promise<Match[]> {
    return this.matchesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a match by ID' })
  @ApiParam({ name: 'id', type: 'integer', required: true }) // Document the route parameter
  @ApiResponse({ status: 200, description: 'Returns a match by ID if found.' })
  @ApiResponse({ status: 404, description: 'Match not found.' })
  findOne(@Param('id') id: string): Promise<Match | null> {
    return this.matchesService.findOne(+id);
  }

  @Get('by-team/:teamId')
  @ApiOperation({ summary: 'Get matches by team ID' })
  @ApiParam({ name: 'teamId', type: 'integer', required: true }) // Document the route parameter
  @ApiResponse({ status: 200, description: 'Returns matches for a team.' })
  findByTeam(@Param('teamId') teamId: string): Promise<Match[]> {
    return this.matchesService.findByTeam(+teamId);
  }

}
