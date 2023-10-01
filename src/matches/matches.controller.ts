import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Query, ParseIntPipe } from '@nestjs/common';
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
import { MatchModel } from './matches.model';
type StatYear = '2023' | '2022' | '2021'
type SeasonYear = StatYear | '2020'

@ApiTags('Matches') // Add a tag to categorize routes under "Matches"
@Controller('matches')
export class MatchesController {
  constructor(private readonly matchesService: MatchesService, private readonly eventsService: EventsService) {}

  @Post()
  @UseGuards(AuthorizationGuard)
  @ApiOperation({ summary: 'Create a new match' })
  @ApiResponse({ status: 201, description: 'Returns the created match.', type: MatchModel })
  @ApiUnauthorizedResponse({ description: 'Missing Bearer Key' }) // Document the unauthorized response
  @ApiExcludeEndpoint(process.env.NODE_ENV !== 'DEV')
  async create(@Body() matchData: any): Promise<MatchModel> {
    const createdMatch = await this.matchesService.create(matchData);
    return createdMatch;
  }

  @Get('')
  @ApiOperation({ summary: 'Get all matches - optionally by season' })
  @ApiQuery({ name: 'season', type: String, required: false, enum: ["2023", "2022", "2021", "2020"]}) // Document the query parameter as optional
  @ApiQuery({ name: 'page', type: Number, required: false, description: 'Page number', example: 1 })
  @ApiQuery({ name: 'perPage', type: Number, required: false, description: 'Items per page', example: 10 })
  @ApiResponse({ status: 200, description: 'Returns matches - Optionally by a season string', type: [MatchModel] })
  findAll(
    @Query('season') season: SeasonYear = '2023',
    @Query('page', ParseIntPipe) page: number = 1, // Default to page 1
    @Query('perPage', ParseIntPipe) perPage: number = 10, // Default to 10 items per page
    ): Promise<MatchModel[]> {
    return this.matchesService.findManyWithPagination('season', season, page, perPage);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a match by ID' })
  @ApiParam({ name: 'id', type: 'integer', required: true }) // Document the route parameter
  @ApiResponse({ status: 200, description: 'Returns a match by ID if found.', type: MatchModel })
  @ApiResponse({ status: 404, description: 'Match not found.' })
  findOne(@Param('id') id: string): Promise<MatchModel | null> {
    return this.matchesService.findOne(+id);
  }

  @Get(':id/events')
  @ApiOperation({ summary: 'Get events of a match by ID' })
  @ApiParam({ name: 'id', type: 'integer', required: true }) // Document the route parameter
  @ApiResponse({ status: 200, description: 'Returns array of match events from match if id found.' })
  @ApiResponse({ status: 404, description: 'Match not found.' })
  findMatchEvents(@Param('id', ParseIntPipe) id: number): Promise<MatchEvents | null> {
    return this.eventsService.findOne(+id);
  }

}
