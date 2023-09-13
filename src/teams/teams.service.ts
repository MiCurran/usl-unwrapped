import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UslTeams } from '.prisma/client';
import { Directive, Field, ID, ObjectType, Int } from '@nestjs/graphql';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@ObjectType({ description: 'USL Team' })
export class UslTeam implements UslTeams {
    @Field()
    @ApiProperty()
    id: number;
    @Field()
    @ApiProperty()
    name: string;
    @Field()
    @ApiProperty()
    conference: string; 
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
}
