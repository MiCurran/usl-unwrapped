import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UslTeams } from '.prisma/client';

@Injectable()
export class TeamsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<UslTeams[]> {
    return this.prisma.uslTeams.findMany();
  }

  async findOne(id: number): Promise<UslTeams | null> {
    return this.prisma.uslTeams.findUnique({
      where: { id },
    });
  }
}
