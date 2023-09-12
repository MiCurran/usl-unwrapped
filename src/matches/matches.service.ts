import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Match, Prisma } from '.prisma/client';

@Injectable()
export class MatchesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.MatchCreateInput): Promise<Match> {
    return this.prisma.match.create({ data });
  }

  async findAll(): Promise<Match[]> {
    return this.prisma.match.findMany();
  }

  async findOne(id: number): Promise<Match | null> {
    return this.prisma.match.findUnique({
      where: { id },
    });
  }

  async findByTeam(teamId: number): Promise<Match[]> {
    return this.prisma.match.findMany({
      where: {
        OR: [
          { homeTeamUslId: teamId },
          { awayTeamUslId: teamId },
        ],
      },
    });
  }

  async update(id: number, data: Prisma.MatchUpdateInput): Promise<Match> {
    return this.prisma.match.update({
      where: { id },
      data,
    });
  }

  async remove(id: number): Promise<void> {
    await this.prisma.match.delete({
      where: { id },
    });
  }
}
