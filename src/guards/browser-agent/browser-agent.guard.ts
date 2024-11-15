import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class BrowserAgentGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.getArgByIndex(0);
    const userAgents = req.headers['user-agent'];

    console.log('__AGENT__', userAgents);
    const isAllowed = userAgents != 'google/chrome';
    if (!isAllowed)
      throw new HttpException('BROWSER_AGENT_INVALID', HttpStatus.BAD_REQUEST);

    return isAllowed;
  }
}
