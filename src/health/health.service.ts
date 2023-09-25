import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Replace with your Prisma service


@Injectable()
export class HealthService {
  constructor(private readonly prisma: PrismaService) {}

  async checkDatabaseHealth(): Promise<boolean> {
    try {
      // Attempt a simple database query to check connectivity
      await this.prisma.$queryRaw`SELECT 1`;
      return true;
    } catch (error) {
      return false;
    }
  }
}