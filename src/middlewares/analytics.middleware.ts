import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class SimpleMiddleware implements NestMiddleware {
  private requestCount = 0;

  use(req: Request, res: Response, next: NextFunction) {
    // Increment request count
    this.requestCount++;

    // Log or perform other operations as needed
    console.info('Logging request Count:', this.requestCount);

    next(); // Continue processing the request
  }
}
