// scraping.controller.ts
import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ScrapingService } from './scraping.service';
import { AuthorizationGuard } from 'src/authorization/authorization.guard';
import { ApiExcludeController } from '@nestjs/swagger';

@UseGuards(AuthorizationGuard)
@ApiExcludeController(true)
@Controller('scraping')
export class ScrapingController {
  constructor(private readonly scrapingService: ScrapingService) {}

@Get('')
 isTaskRunning(){
    return this.scrapingService.isTaskRunning();
 }

  @Post('start')
  startScraping() {
    if (!this.scrapingService.isTaskRunning()) {
      this.scrapingService.scrapeLiveScores();
      return 'Scraping job started.';
    } else {
      return 'Scraping job is already running.';
    }
  }

  @Post('stop')
  stopScraping() {
    this.scrapingService.stopTask();
    return 'Scraping job stopped.';
  }
}
