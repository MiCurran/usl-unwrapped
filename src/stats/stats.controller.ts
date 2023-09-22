import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Query, ParseIntPipe } from '@nestjs/common';
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
import { StatsService } from './stats.service';
type StatType =
  | 'Goal'
  | 'Assist'
  | 'Shot'
  | 'Cross'
  | 'Pass'
  | 'ChancesCreated'
  | 'CleanSheet'
  | 'Save'
  | 'Clearance'
  | 'YellowCard'
  | 'RedCard';
type StatYear = '2023' | '2022' | '2021'
@ApiTags('Stat Leaders') // Add a tag to categorize routes under "Matches"
@Controller('stats')
export class StatsController {
    constructor (private readonly statsService: StatsService) {}

    @Get(':type')
    @ApiOperation({ 
        summary: 'Get Stat Leaders by stat - Goal | Assist | Shot | Cross | Pass | ChancesCreated | CleanSheet | Save | Clearance | YellowCard | RedCard' 
    })
    @ApiParam({ 
        name: 'type',
        type: String,
        required: true,
        enum: ['Goal', 'Assist', 'Shot', 'Cross', 'Pass', 'ChancesCreated', 'CleanSheet', 'Save', 'Clearance', 'YellowCard', 'RedCard'],
    }) // Document the query parameter as optional
    @ApiQuery({ 
        name: 'season',
        type: String,
        required: false,
        enum: ['2023', '2022', '2021'],
    }) // Document the query parameter as optional
    @ApiResponse({ status: 200, description: 'Returns stat leaders by stat type - Optionally by a season (default 2023)' })
    findAll(
      @Param('type') type: StatType,
      @Query('season') season: StatYear,
      ): Promise<any[]> {
      return this.statsService.findAllByType(type, season);
    }
}
