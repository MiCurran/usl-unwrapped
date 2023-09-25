import { Controller, Get, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { EventsService } from './events.service';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiUnauthorizedResponse } from '@nestjs/swagger'; // Import Swagger decorators
import { AuthorizationGuard } from 'src/authorization/authorization.guard';
import { EventsModel } from './events.model';


@ApiTags('Match Events') // Add a tag to categorize routes under "Match Events"
@Controller('match-events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  //one liner to enable auth on single routes in controller
  @UseGuards(AuthorizationGuard)
  @ApiOperation({ summary: 'Get all match events from all matches' })
  @ApiResponse({ status: 200, description: 'Returns an array of matches with match events', type: [EventsModel] })
  @ApiUnauthorizedResponse({ description: 'Missing Bearer Key' }) // Document the unauthorized response
  findAll(): Promise<EventsModel[]> {
    return this.eventsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get match events by MATCH ID' })
  @ApiParam({ name: 'id', type: 'integer', required: true }) // Document the route parameter
  @ApiResponse({ status: 200, description: 'Returns a match event array by MatchID if found.', type: EventsModel })
  @ApiResponse({ status: 404, description: 'Match and events not found.' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<EventsModel | null> {
    return this.eventsService.findOne(id);
  }
}
