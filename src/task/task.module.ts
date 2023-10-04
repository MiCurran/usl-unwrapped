import { Module } from '@nestjs/common';
import { ScrapingService } from 'src/scraping/scraping.service';

@Module({
    imports: [],
    providers: [ScrapingService],
})
export class TaskModule {}
