import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiUnauthorizedResponse } from '@nestjs/swagger'; // Import Swagger decorators
import { Controller, Get } from '@nestjs/common';
import { ScoresService } from './scores.service';
import { LiveScores } from '@prisma/client';

@Controller('live-scores')
export class ScoresController {
    constructor(private readonly scoresService: ScoresService){}
  @Get()
  @ApiOperation({ summary: 'Get all live matches' })
  @ApiResponse({ status: 200, description: 'Returns an array of live matches' })
  findAll(): Promise<LiveScores[]> {
    return this.scoresService.getLiveScores();
  }

}
