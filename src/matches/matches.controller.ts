import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { MatchesService } from './matches.service';
import { Match, MatchEvents, Prisma } from '.prisma/client';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiUnauthorizedResponse,
  ApiExcludeEndpoint
} from '@nestjs/swagger'; // Import Swagger decorators
import { AuthorizationGuard } from 'src/authorization/authorization.guard';
import { EventsService } from 'src/events/events.service';
@ApiTags('Matches') // Add a tag to categorize routes under "Matches"
@Controller('matches')
export class MatchesController {
  constructor(private readonly matchesService: MatchesService, private readonly eventsService: EventsService) {}

  @Post()
  @UseGuards(AuthorizationGuard)
  @ApiOperation({ summary: 'Create a new match' })
  @ApiResponse({ status: 201, description: 'Returns the created match.' })
  @ApiUnauthorizedResponse({ description: 'Missing Bearer Key' }) // Document the unauthorized response
  @ApiExcludeEndpoint(process.env.NODE_ENV !== 'DEV')
  async create(@Body() matchData: Match): Promise<Match> {
    const createdMatch = await this.matchesService.create(matchData);
    return createdMatch;
  }

  @Get('')
  @ApiOperation({ summary: 'Get all matches - optionally by season' })
  @ApiQuery({ name: 'season', type: String, required: false }) // Document the query parameter as optional
  @ApiResponse({ status: 200, description: 'Returns matches - Optionally by a season string' })
  findByTeam(@Query('season') season: string): Promise<Match[]> {
    return this.matchesService.findMany('season', season);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a match by ID' })
  @ApiParam({ name: 'id', type: 'integer', required: true }) // Document the route parameter
  @ApiResponse({ status: 200, description: 'Returns a match by ID if found.' })
  @ApiResponse({ status: 404, description: 'Match not found.' })
  findOne(@Param('id') id: string): Promise<Match | null> {
    return this.matchesService.findOne(+id);
  }

  @Get(':id/events')
  @ApiOperation({ summary: 'Get events of a match by ID' })
  @ApiParam({ name: 'id', type: 'integer', required: true }) // Document the route parameter
  @ApiResponse({ status: 200, description: 'Returns array of match events from match if id found.' })
  @ApiResponse({ status: 404, description: 'Match not found.' })
  findMatchEvents(@Param('id') id: string): Promise<MatchEvents | null> {
    return this.eventsService.findOne(+id);
  }

}
