import { Directive, Field, ID, ObjectType, Int } from '@nestjs/graphql';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
//we need to update every object field here to match the events
import { MatchEvents } from '@prisma/client';


@ObjectType({ description: 'Event' })
class Event {
  @Field()
  @ApiProperty()
  time: string;

  @Field()
  @ApiProperty()
  event: string;
}

@ObjectType({ description: 'MatchEvents' })
export class EventsModel implements MatchEvents {
  @Field(() => ID)
  @ApiProperty({ type: 'integer', format: 'int64' })
  id: number;

  @Field(() => [Event])
  @ApiProperty({ type: [Event] })
  events: any[];

  @Field(() => Int) // Use Int type for matchId
  matchId: number;
}

