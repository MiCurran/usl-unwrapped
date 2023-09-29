import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { MatchEvents } from '.prisma/client';
import { EventsModel } from './events.model';

@Injectable()
export class EventsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<EventsModel[]> {
    return this.prisma.matchEvents.findMany({orderBy: {id: 'desc'}});
  }

  async findOne(id: number): Promise<EventsModel | null> {
    return this.prisma.matchEvents.findUnique({
      where: { id },
    });
  }
}
