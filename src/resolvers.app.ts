import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import {
  Match as PrismaMatch,
  MatchTeam,
  MatchPlayer,
  MatchEvents,
} from '@prisma/client';
import { MatchModel } from './matches/matches.model';
import { MatchesService } from './matches/matches.service';
import { EventsService } from './events/events.service';

@Resolver()
export class MatchResolver {
  constructor(private readonly matchesService: MatchesService, private readonly eventsService: EventsService) {}
  @Query(() => [MatchModel])
  async matches(): Promise<PrismaMatch[]> {
    return this.matchesService.findAll();
  }

  @Query(() => MatchModel, { nullable: true })
  async match(@Args('id') id: number): Promise<PrismaMatch | null> {
    return this.matchesService.findOne(id);
  }

  @Query(() => [MatchModel])
  async matchesByTeam(@Args('teamId') teamId: number): Promise<PrismaMatch[]> {
    return this.matchesService.findByTeam(teamId)
  }
}
