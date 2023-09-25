import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'VIEW API DOCUMENTATION AT /docs';
  }

  getHealth(): string {
    return  'SERVER CHECK HEALTHY'
  }
}
