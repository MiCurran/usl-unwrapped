import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import {
  MatchEvents,
} from '@prisma/client';
import { EventsModel } from './events.model';
import { EventsService } from './events.service';

@Resolver()
export class EventsResolver {
  constructor(private readonly eventsService: EventsService) {}
  @Query(() => [EventsModel])
  async matchEvents(): Promise<EventsModel[]> {
    return this.eventsService.findAll();
  }

  @Query(() => EventsModel, { nullable: true })
  async singleMatchEvents(@Args('id') id: number): Promise<EventsModel | null> {
    return this.eventsService.findOne(id);
  }
}
