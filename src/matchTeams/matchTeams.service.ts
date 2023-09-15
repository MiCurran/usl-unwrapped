import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UslTeams, MatchTeam } from '.prisma/client';

@Injectable()
export class MatchTeamsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<MatchTeam[]> {
    return this.prisma.matchTeam.findMany();
  }

  async findManyWithPagination(page: number, perPage: number): Promise<MatchTeam[]> {
    const skip = (page - 1) * perPage;
    
    return this.prisma.matchTeam.findMany({
      skip,
      take: perPage,
    });
  }

  async findOne(id: number): Promise<MatchTeam | null> {
    return this.prisma.matchTeam.findUnique({
      where: { id },
    });
  }

  async findByTeam(teamId: number): Promise<MatchTeam[] | null> {
    return this.prisma.matchTeam.findMany({
      where: {
        uslTeamId: teamId
      }
    })
  }
}
