import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UslTeams, Prisma } from '.prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTeamDTO {
  name: string;
  conference: string;
  active: boolean;
}

export class UslTeam implements UslTeams {
    @ApiProperty()
    id: number;
    @ApiProperty()
    name: string;
    @ApiProperty()
    conference: string;
    @ApiProperty()
    active: boolean;  
}

@Injectable()
export class TeamsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<UslTeam[]> {
    return this.prisma.uslTeams.findMany();
  }

  async findOne(id: number): Promise<UslTeam | null> {
    return this.prisma.uslTeams.findUnique({
      where: { id },
    });

   }

  async createOne(data: CreateTeamDTO): Promise<UslTeam> {
    return this.prisma.uslTeams.create({
      data: {
        ...data
      },
    });
  }

  async updateOne(id: number, data: Prisma.UslTeamsUpdateInput): Promise<UslTeam> {
    return this.prisma.uslTeams.update({
      where: { id },
      data: {
        ...data
      },
    });
  }

}
