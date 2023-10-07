import { Module } from '@nestjs/common';
import { ScrapingController } from './scraping.controller';
import { ConfigService } from '@nestjs/config';
import { ScrapingService } from './scraping.service';
import { ScoresService } from 'src/scores/scores.service';

@Module({
  controllers: [ScrapingController],
  imports: [],
  providers: [ConfigService, ScrapingService, ScoresService]
})
export class ScrapingModule {}
