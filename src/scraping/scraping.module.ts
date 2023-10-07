import { Module } from '@nestjs/common';
import { ScrapingController } from './scraping.controller';
import { ConfigService } from '@nestjs/config';
import { ScrapingService } from './scraping.service';

@Module({
  controllers: [ScrapingController],
  imports: [],
  providers: [ConfigService, ScrapingService]
})
export class ScrapingModule {}
