import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { Match, MatchEvents, Prisma } from '.prisma/client';

@Controller('match-events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  findAll(): Promise<MatchEvents[]> {
    return this.eventsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<MatchEvents | null> {
    return this.eventsService.findOne(+id);
  }

}
