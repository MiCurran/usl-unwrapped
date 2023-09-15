import { Module } from '@nestjs/common';
import { MatchesService } from './matches.service';
import { MatchesController } from './matches.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ConfigService } from '@nestjs/config';
import { EventsModule } from 'src/events/events.module';
import { EventsService } from 'src/events/events.service';

@Module({
  imports: [PrismaModule, EventsModule],
  providers: [MatchesService, ConfigService, EventsService],
  controllers: [MatchesController],
})
export class MatchesModule {}
