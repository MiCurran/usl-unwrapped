// live-scores.service.ts
import { Injectable } from '@nestjs/common';
import { LiveScores } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { createLiveScoreFromJSON } from 'src/utils/createLiveScoreFromJSON';

@Injectable()
export class ScoresService {
  constructor(private readonly prisma: PrismaService) {}

  async createLiveScore(data: any): Promise<any> {
    return await createLiveScoreFromJSON(data);
  }

  async getLiveScores(): Promise<LiveScores[]> {
    return this.prisma.liveScores.findMany();
  }

}
