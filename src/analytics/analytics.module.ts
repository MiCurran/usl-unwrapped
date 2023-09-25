import { Module } from '@nestjs/common';
import { AnalyticsController } from './analytics.controller';
import { AnalyticsService } from './analytics.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { MatchesService } from 'src/matches/matches.service';

@Module({
  controllers: [AnalyticsController],
  providers: [AnalyticsService, PrismaService, MatchesService]
})
export class AnalyticsModule {}
