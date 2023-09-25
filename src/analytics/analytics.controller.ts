import { Controller, Get, Param, Query } from '@nestjs/common';
import { MatchEvents, UslTeams, Prisma, MatchTeam, Match } from '.prisma/client';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger'; // Import Swagger decorators
import { AnalyticsService } from './analytics.service';

@ApiTags('Analytics') 
@Controller('analytics')
export class AnalyticsController {
    constructor(private readonly analyticsService: AnalyticsService) {}

    @Get(':uslTeamOneId/matches/:uslTeamTwoId')
    @ApiOperation({ summary: 'Analyze matches between two teams' })
    @ApiParam({ name: 'uslTeamOneId', type: 'integer', required: true })
    @ApiParam({ name: 'uslTeamTwoId', type: 'integer', required: true }) 
    @ApiResponse({ status: 200, description: 'Returns 5 recent matches between two teams.' })
    findMatchesBetweenTeams(
      @Param('uslTeamOneId') uslTeamOneId: string, 
      @Param('uslTeamTwoId') uslTeamTwoId: string
      ): Promise<any[]> {
      return this.analyticsService.analyzeBetweenTeams(+uslTeamOneId, +uslTeamTwoId);
    }

}
