import { Controller, Get } from '@nestjs/common';
import { HealthService } from './health.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('API Health') 
@Controller('health')
export class HealthController {
    constructor(private readonly healthService: HealthService) {}

  @Get()
 async checkHealth() {
    const databaseHealth = await this.healthService.checkDatabaseHealth();
    // we should return the db error if found here

    if (databaseHealth) {
      return { status: 'ok', message: 'API is healthy' };
    } else {
      return { status: 'error', message: 'Database connectivity issue' };
    }
  }
}