import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { TeamsService, UslTeam } from './teams.service';

@Resolver()
export class TeamsResolver {
  constructor(private readonly teamsService: TeamsService) {}
  @Query(() => [UslTeam])
  async uslTeams(): Promise<UslTeam[]> {
    return this.teamsService.findAll();
  }

  @Query(() => UslTeam, { nullable: true })
  async uslTeam(@Args('id') id: number): Promise<UslTeam | null> {
    return this.teamsService.findOne(id);
  }
}
