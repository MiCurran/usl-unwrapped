import { Module } from '@nestjs/common';
import { ScoresService } from './scores.service';
import { ScoresController } from './scores.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [ScoresService, PrismaService],
  controllers: [ScoresController]
})
export class ScoresModule {}
