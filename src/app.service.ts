import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello from REST';
  }

  getHealth(): string {
    return  'SERVER CHECK HEALTHY'
  }
}
