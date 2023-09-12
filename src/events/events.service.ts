import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { MatchEvents } from '.prisma/client';

@Injectable()
export class EventsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<MatchEvents[]> {
    return this.prisma.matchEvents.findMany();
  }

  async findOne(id: number): Promise<MatchEvents | null> {
    return this.prisma.matchEvents.findUnique({
      where: { id },
    });
  }
}
