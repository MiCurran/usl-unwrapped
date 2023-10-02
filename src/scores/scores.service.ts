// live-scores.service.ts
import { Injectable } from '@nestjs/common';
import { LiveScores } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ScoresService {
  constructor(private prisma: PrismaService) {}

  async createLiveScore(data: any): Promise<LiveScores> {
    return this.prisma.liveScores.create({ data });
  }

  async updateLiveScore(id: number, data: any): Promise<LiveScores> {
    return this.prisma.liveScores.update({ where: { id }, data });
  }

  async getLiveScores(): Promise<LiveScores[]> {
    return this.prisma.liveScores.findMany();
  }

  // Add other methods as needed
}
