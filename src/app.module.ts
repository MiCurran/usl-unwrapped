import { Module } from '@nestjs/common';
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
import { DocumentationController } from './documentation/documentation.controller';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      buildSchemaOptions: { dateScalarMode: 'timestamp' },
    }),
    MatchesModule,
    EventsModule
  ],
  controllers: [AppController, MatchesController, EventsController, DocumentationController],
  providers: [PrismaService, MatchResolver, AppService, MatchesService, EventsService, EventsResolver],
})
export class AppModule {}
