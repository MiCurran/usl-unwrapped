import { Controller, Get, Param } from '@nestjs/common';
import { EventsService } from './events.service';
import { MatchEvents, Prisma } from '.prisma/client';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger'; // Import Swagger decorators

@ApiTags('Match Events') // Add a tag to categorize routes under "Match Events"
@Controller('match-events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all match events from all matches' })
  @ApiResponse({ status: 200, description: 'Returns an array of matches with match events' })
  findAll(): Promise<MatchEvents[]> {
    return this.eventsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get match events by MATCH ID' })
  @ApiParam({ name: 'id', type: 'integer', required: true }) // Document the route parameter
  @ApiResponse({ status: 200, description: 'Returns a match event array by MatchID if found.' })
  @ApiResponse({ status: 404, description: 'Match and events not found.' })
  findOne(@Param('id') id: string): Promise<MatchEvents | null> {
    return this.eventsService.findOne(+id);
  }
}
