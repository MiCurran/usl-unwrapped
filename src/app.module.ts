import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { GraphQLModule } from '@nestjs/graphql';
import { PrismaService } from './prisma/prisma.service';
import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { MatchResolver } from './matches/matches.resolver';
import { MatchesModule } from './matches/matches.module';
import { MatchesService } from './matches/matches.service';
import { MatchesController } from './matches/matches.controller';
import { EventsController } from './events/events.controller';
import { EventsService } from './events/events.service';
import { EventsResolver } from './events/events.resolver';
import { EventsModule } from './events/events.module';
import { TeamsController } from './teams/teams.controller';
import { TeamsService } from './teams/teams.service';
import { TeamsModule } from './teams/teams.module';
import { AuthorizationModule } from './authorization/authorization.module';
import { ConfigModule } from '@nestjs/config';
import { MatchTeamsController } from './matchTeams/matchTeams.controller';
import { MatchTeamsService } from './matchTeams/matchTeams.service';
import { MatchTeamsModule } from './matchTeams/matchTeams.module';
import { TeamsResolver } from './teams/teams.resolver';
import { StatsModule } from './stats/stats.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { HealthModule } from './health/health.module';
import { LoggerModule } from 'nestjs-pino';
import { DeprecationMiddleware } from './deprecation/deprecation.middleware';
import { ScoresModule } from './scores/scores.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ScrapingService } from './scraping/scraping.service';
import { ScrapingModule } from './scraping/scraping.module';
import { ScoresController } from './scores/scores.controller';
import { AnalyticsController } from './analytics/analytics.controller';
import { HealthController } from './health/health.controller';
import { ScrapingController } from './scraping/scraping.controller';
import { StatsController } from './stats/stats.controller';
import { StatsService } from './stats/stats.service';
import { ScoresService } from './scores/scores.service';
import { AnalyticsService } from './analytics/analytics.service';
import { HealthService } from './health/health.service';


@Module({
  imports: [
    CacheModule.register({isGlobal: true}), 
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      buildSchemaOptions: { dateScalarMode: 'timestamp' },
    }),
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
    AnalyticsController,
    HealthController,
    MatchesController,
    EventsController,
    TeamsController,
    MatchTeamsController,
    ScoresController,
    ScrapingController,
    StatsController,
  ],
  providers: [
    PrismaService, 
    MatchResolver,
    AppService, 
    MatchesService, 
    EventsService, 
    EventsResolver, 
    TeamsService, 
    MatchTeamsService,
    TeamsResolver, 
    ScrapingService,
    StatsService,
    ScoresService,
    AnalyticsService,
    HealthService
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(DeprecationMiddleware).forRoutes('analytics/:uslTeamOneId/matches/:uslTeamTwoId');
  }
}
