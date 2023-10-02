import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, Request } from 'express';

@Injectable()
export class DeprecationMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    // Check if the request has already been redirected
    if (req.headers['x-redirected']) {
      console.log('already redirected so skipping');
      next(); // Skip redirection to avoid circular redirects
      return;
    }

    // Extract route parameters from req.params
    const { uslTeamOneId, uslTeamTwoId } = req.params;
    console.log(req.params)
    const newRoute = `/analytics/${uslTeamOneId}/matchup/${uslTeamTwoId}`; // Corrected format

    // Send a deprecation warning to the client
    res.setHeader('Warning', '199 - "Deprecated API. This Route has moved - Use the new API route.');

    // Set the "Location" header to the new route
    res.setHeader('Location', newRoute);

    // Mark the request as redirected
    req.headers['x-redirected'] = 'true';
    console.log('setting redirect');
    console.log(req.headers);

    // Respond with a 301 status code
    res.status(301).send();
  }
}
