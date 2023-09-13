import { MiddlewareConsumer, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { PrismaService } from './prisma/prisma.service';
import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { MatchResolver } from './resolvers.app';
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
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      buildSchemaOptions: { dateScalarMode: 'timestamp' },
    }),
    MatchesModule,
    EventsModule,
    TeamsModule,
    AuthorizationModule,
    ConfigModule.forRoot()
  ],
  controllers: [AppController, MatchesController, EventsController, TeamsController],
  providers: [PrismaService, MatchResolver, AppService, MatchesService, EventsService, EventsResolver, TeamsService],
})
export class AppModule { 
}
