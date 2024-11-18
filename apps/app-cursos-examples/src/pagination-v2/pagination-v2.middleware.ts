import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request } from '@nestjs/common';

@Injectable()
export class PaginationV2Middleware implements NestMiddleware {
  use(req: RequestPaginateV2, next: () => void) {
    /*
     * QueryParams
     * limit=10
     * page=2
     */
    console.log('___SOY_MIDDLEWARE__');
    const { limit = 5, page = 1 } = req.query;
    req.paginate = { limit, page };
    next();
  }
}

interface RequestPaginateV2 extends Request {
  query?: any;
  paginate?: {
    limit: any;
    page: any;
  };
}
