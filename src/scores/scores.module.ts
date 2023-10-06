import { Module } from '@nestjs/common';
import { ScoresService } from './scores.service';
import { ScoresController } from './scores.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [ScoresService, PrismaService, ConfigService],
  controllers: [ScoresController]
})
export class ScoresModule {}
