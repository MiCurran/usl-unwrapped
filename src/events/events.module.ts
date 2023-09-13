import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [PrismaModule],
  providers: [EventsService, ConfigService],
  controllers: [EventsController],
})
export class EventsModule {}
