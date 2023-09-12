import { Directive, Field, ID, ObjectType, Int } from '@nestjs/graphql';

//we need to update every object field here to match the events

@ObjectType({ description: 'Event' })
class Event {
  @Field()
  time: string;

  @Field()
  event: string;
}

@ObjectType({ description: 'MatchEvents' })
export class EventsModel {
  @Field(() => ID)
  id: number;

  @Field(() => [Event])
  events: Event[];

  @Field(() => Int) // Use Int type for matchId
  matchId: number;
}
