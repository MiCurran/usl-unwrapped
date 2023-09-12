
import { Controller, Get, Param } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { MatchEvents, UslTeams, Prisma } from '.prisma/client';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger'; // Import Swagger decorators

@ApiTags('USL TEAMS') 
@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all USL Teams' })
  @ApiResponse({ status: 200, description: 'Returns an array of USL Teams and their IDs' })
  findAll(): Promise<UslTeams[]> {
    return this.teamsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get USL Team by ID' })
  @ApiParam({ name: 'id', type: 'integer', required: true }) // Document the route parameter
  @ApiResponse({ status: 200, description: 'Returns a USL team by MatchID if found.' })
  @ApiResponse({ status: 404, description: 'USL Team not found.' })
  findOne(@Param('id') id: string): Promise<UslTeams | null> {
    return this.teamsService.findOne(+id);
  }
}
