import { Module } from '@nestjs/common';
import { ScrapingController } from './scraping.controller';
import { ConfigService } from '@nestjs/config';
import { ScrapingService } from './scraping.service';
import { ScoresService } from 'src/scores/scores.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ScrapingController],
  imports: [],
  providers: [ConfigService, ScrapingService, ScoresService, PrismaService]
})
export class ScrapingModule {}
