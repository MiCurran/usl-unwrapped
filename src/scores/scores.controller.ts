import { 
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiExcludeEndpoint
} from '@nestjs/swagger';
import { Controller, Delete, Get, UseGuards } from '@nestjs/common';
import { ScoresService } from './scores.service';
import { LiveScores } from '@prisma/client';
import { AuthorizationGuard } from 'src/authorization/authorization.guard';

@ApiTags('Live Scores')
@Controller('live-scores')
export class ScoresController {
    constructor(private readonly scoresService: ScoresService){}
  @Get()
  @ApiOperation({ summary: 'Get all live scores' })
  @ApiResponse({ status: 200, description: 'Returns an array of live scores' })
  findAll(): Promise<LiveScores[]> {
    return this.scoresService.getLiveScores();
  }

  @Delete()
  @ApiExcludeEndpoint(process.env.NODE_ENV !== 'DEV')
  @UseGuards(AuthorizationGuard)
  @ApiResponse({ status: 200, description: 'Removes all current live score records from db'})
  @ApiUnauthorizedResponse({status: 401, description: 'Missing bearer key'})
  deleteAllLiveScores(): Promise<any> {
    return this.scoresService.deleteAll();
  }
}
