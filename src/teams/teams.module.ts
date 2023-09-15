import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MatchesModule } from 'src/matches/matches.module';
import { MatchesService } from 'src/matches/matches.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TeamsController } from './teams.controller';
import { TeamsService } from './teams.service';
import { MatchTeamsModule } from 'src/matchTeams/matchTeams.module';
import { MatchTeamsService } from 'src/matchTeams/matchTeams.service';

@Module({
    imports: [PrismaModule, MatchesModule, MatchTeamsModule],
    providers: [MatchesService, ConfigService, TeamsService, MatchTeamsService],
    controllers: [TeamsController]

})
export class TeamsModule {}
