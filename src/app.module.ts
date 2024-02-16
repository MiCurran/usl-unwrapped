import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { PrismaService } from './prisma/prisma.service';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { MatchesModule } from './matches/matches.module';
import { EventsModule } from './events/events.module';
import { TeamsModule } from './teams/teams.module';
import { AuthorizationModule } from './authorization/authorization.module';
import { ConfigModule } from '@nestjs/config';
import { MatchTeamsModule } from './matchTeams/matchTeams.module';
import { StatsModule } from './stats/stats.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { HealthModule } from './health/health.module';
import { LoggerModule } from 'nestjs-pino';
import { DeprecationMiddleware } from './deprecation/deprecation.middleware';
import { ScoresModule } from './scores/scores.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ScrapingModule } from './scraping/scraping.module';


@Module({
  imports: [
    CacheModule.register({isGlobal: true}), 
    LoggerModule.forRoot({
      pinoHttp: {
        customProps: (req, res) => ({
          context: 'HTTP',
        }),
        transport: {
          target: 'pino-pretty',
          options: {
            singleLine: true
          }
        },
      },
    }),
    MatchesModule,
    EventsModule,
    TeamsModule,
    MatchTeamsModule,
    AuthorizationModule,
    ConfigModule.forRoot(),
    StatsModule,
    AnalyticsModule,
    HealthModule,
    ScoresModule,
    ScrapingModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [
    AppController,
  ],
  providers: [
    PrismaService, 
    AppService, 
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(DeprecationMiddleware).forRoutes('analytics/:uslTeamOneId/matches/:uslTeamTwoId');
  }
}
