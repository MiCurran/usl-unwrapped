import { MiddlewareConsumer, Module } from '@nestjs/common';
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

@Module({
  imports: [
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
    HealthModule
  ],
  controllers: [AppController, MatchesController, EventsController, TeamsController, MatchTeamsController],
  providers: [PrismaService, MatchResolver, AppService, MatchesService, EventsService, EventsResolver, TeamsService, MatchTeamsService, TeamsResolver],
})
export class AppModule { 
}
