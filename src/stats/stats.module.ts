import { Module } from '@nestjs/common';
import { StatsService } from './stats.service';
import { StatsController } from './stats.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [StatsService, PrismaService],
  controllers: [StatsController]
})
export class StatsModule {}
