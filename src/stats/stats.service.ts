import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StatsService {
    constructor(private readonly prisma: PrismaService) {}

    async findAllByType(type: string, season: string = '2023'): Promise<any[]> {
        const modelName = `${type}Leader`; 
        const filter = {season: season}
       return  await this.prisma[modelName].findMany({
        where: {...filter},
       });
      }
}
