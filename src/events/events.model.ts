import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
//we need to update every object field here to match the events
import { MatchEvents } from '@prisma/client';


class Event {
  @ApiProperty()
  time: string;

  @ApiProperty()
  event: string;
}

export class EventsModel implements MatchEvents {
  @ApiProperty({ type: 'integer', format: 'int64' })
  id: number;

  @ApiProperty({ type: [Event] })
  events: any[];

  matchId: number;
}

