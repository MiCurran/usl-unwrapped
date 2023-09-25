import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Match, Prisma } from '.prisma/client';
import { getRecentMatchStatsBetweenTwoTeams } from 'src/utils/prismaHelpers';
type Where = 'home' | 'away'

@Injectable()
export class MatchesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.MatchCreateInput): Promise<Match> {
    return this.prisma.match.create({ data });
  }

  async findAll(): Promise<Match[]> {
    return this.prisma.match.findMany();
  }

  async findManyWithPagination(key: string, value: string, page: number, perPage: number): Promise<Match[]> {
    const skip = (page - 1) * perPage;
    const f: Prisma.MatchWhereInput | any = {[key]: value}
    return this.prisma.match.findMany({
      where: {...f},
      skip,
      take: perPage,
    });
  }

  async findMany(key: string, value: string): Promise<Match[]> {
    const f: Prisma.MatchWhereInput | any = {[key]: value}
    return this.prisma.match.findMany({where: {...f}});
  }

  async findOne(id: number): Promise<Match | null> {
    return this.prisma.match.findUnique({
      where: { id },
    });
  }

  async findByTeam( teamId: number, where?: string,): Promise<Match[]> {
    if (where === 'home') {
      return this.prisma.match.findMany({
        where: {
            homeTeamUslId: teamId,
        },
      }); 
    }
    if (where === 'away') {
      return this.prisma.match.findMany({
        where: {
            awayTeamUslId: teamId,
        },
      }); 
    } else {
    return this.prisma.match.findMany({
      where: {
        OR: [
          { homeTeamUslId: teamId },
          { awayTeamUslId: teamId },
        ],
      },
    });
    }
  }
  async findBetweenTeams(id: number, opponentId: number): Promise<Match[]> {
      return await this.prisma.match.findMany({
        where: {
          AND: [
            {
              OR: [
                { homeTeamUslId: id, awayTeamUslId: opponentId },
                { homeTeamUslId: opponentId, awayTeamUslId: id },
              ],
            },
          ],
        },
        orderBy: {
          date: 'desc',
        },
        take: 5,
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
