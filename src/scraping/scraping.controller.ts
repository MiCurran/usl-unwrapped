// scraping.controller.ts
import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ScrapingService } from './scraping.service';
import { AuthorizationGuard } from 'src/authorization/authorization.guard';
import { ApiExcludeController } from '@nestjs/swagger';
import { ScoresService } from 'src/scores/scores.service';

@UseGuards(AuthorizationGuard)
@ApiExcludeController(true)
@Controller('scraping')
export class ScrapingController {
  constructor(private readonly scrapingService: ScrapingService, private readonly scoresService: ScoresService) {}

@Get('')
 isTaskRunning(){
    return this.scrapingService.isTaskRunning();
 }

  @Post('start')
  async startScraping() {
    if (!this.scrapingService.isTaskRunning()) {
      const scores = await this.scrapingService.scrapeLiveScores();
      for(const score of scores){
        this.scoresService.createLiveScore(score)
      }
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
