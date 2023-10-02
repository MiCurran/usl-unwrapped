import { Controller, Get, Param, Query, ParseIntPipe } from '@nestjs/common';
import { MatchEvents, UslTeams, Prisma, MatchTeam, Match } from '.prisma/client';
import { ApiTags, ApiOperation, ApiOkResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { AnalyticsService } from './analytics.service';
import { AnalyticsModel } from './analytics.model';
import { API_ERROR } from 'src/utils/error/api.error';
type TeamStats = {
  form: string,
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
  teamName: string;
  analyzedStats: TeamStats;
  matchData: Match[];
};

type AnalyticsResponse = {
  teamOne: TeamInfo;
  teamTwo: TeamInfo;
};
@ApiTags('Analytics') 
@Controller('analytics')
export class AnalyticsController {
    constructor(private readonly analyticsService: AnalyticsService) {}

    @Get(':uslTeamOneId/matches/:uslTeamTwoId')
    @ApiOperation({ summary: 'DEPRECATION WARNING - Moved to :uslTeamOneId/matchup/:uslTeamTwoId - Analyze the 5 most recent matches of two teams' })
    @ApiParam({ name: 'uslTeamOneId', type: 'integer', required: true })
    @ApiParam({ name: 'uslTeamTwoId', type: 'integer', required: true }) 
    @ApiOkResponse({ status: 200, description: 'Returns ', type: AnalyticsModel })
    findMatchesBetweenTeams(
      @Param('uslTeamOneId', ParseIntPipe) uslTeamOneId: number, 
      @Param('uslTeamTwoId', ParseIntPipe) uslTeamTwoId: number
      ): Promise<AnalyticsResponse | API_ERROR> {
      return this.analyticsService.analyzeBetweenTeams(uslTeamOneId, uslTeamTwoId);
    }

    @Get(':uslTeamOneId/matchup/:uslTeamTwoId')
    @ApiOperation({ summary: 'Analyze the 5 most recent matches of two teams' })
    @ApiParam({ name: 'uslTeamOneId', type: 'integer', required: true })
    @ApiParam({ name: 'uslTeamTwoId', type: 'integer', required: true }) 
    @ApiOkResponse({ status: 200, description: 'Returns ', type: AnalyticsModel })
    getMatchupBetweenTeams(
      @Param('uslTeamOneId', ParseIntPipe) uslTeamOneId: number, 
      @Param('uslTeamTwoId', ParseIntPipe) uslTeamTwoId: number
      ): Promise<AnalyticsResponse | API_ERROR> {
      return this.analyticsService.analyzeBetweenTeams(uslTeamOneId, uslTeamTwoId);
    }

}
