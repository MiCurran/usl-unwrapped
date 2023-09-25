import { Controller, Get, Param, Query } from '@nestjs/common';
import { MatchEvents, UslTeams, Prisma, MatchTeam, Match } from '.prisma/client';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger'; // Import Swagger decorators
import { AnalyticsService } from './analytics.service';
import { AnalyticsModel } from './analytics.model';
type TeamStats = {
  totalGoalsScored: number;
  matchesWithMoreThanOneGoal: number;
  cleanSheets: number;
  shotsVsTarget: string;
  longBallPercentage: string;
  averagePassingAccuracy: string;
  averageCrossingAccuracy: string;
  possessionPlusMinus: string;
};

type TeamInfo = {
  team: string;
  stats: TeamStats;
};

type SwaggerResponse = {
  teamOne: TeamInfo;
  teamTwo: TeamInfo;
};
@ApiTags('Analytics') 
@Controller('analytics')
export class AnalyticsController {
    constructor(private readonly analyticsService: AnalyticsService) {}

    @Get(':uslTeamOneId/matches/:uslTeamTwoId')
    @ApiOperation({ summary: 'Analyze the 5 most recent matches of two teams' })
    @ApiParam({ name: 'uslTeamOneId', type: 'integer', required: true })
    @ApiParam({ name: 'uslTeamTwoId', type: 'integer', required: true }) 
    @ApiResponse({ status: 200, description: 'Returns ', type: AnalyticsModel })
    findMatchesBetweenTeams(
      @Param('uslTeamOneId') uslTeamOneId: string, 
      @Param('uslTeamTwoId') uslTeamTwoId: string
      ): Promise<any[]> {
      return this.analyticsService.analyzeBetweenTeams(+uslTeamOneId, +uslTeamTwoId);
    }

}
