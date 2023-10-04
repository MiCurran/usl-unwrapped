import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ScrapingService } from 'src/scraping/scraping.service';
import { createLiveScoreFromJSON } from 'src/utils/createLiveScoreFromJSON';

@Injectable()
export class TasksService {
    private readonly logger = new Logger(TasksService.name)
    constructor(private readonly scrapingService: ScrapingService){}

  @Cron('*/5 * * * *')
 async handleInterval() {
          this.logger.log('Calling scrape live match data');
          const scores = await this.scrapingService.scrapeLiveScores();
          for (const score of scores) {
              const record = await createLiveScoreFromJSON(score);
              console.log('handled record: ',record);
          }
  };
}

