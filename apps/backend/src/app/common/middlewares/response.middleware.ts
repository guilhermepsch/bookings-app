import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

interface PaginatedMeta {
  total: number;
  page: number;
  pageSize: number;
}

interface GenericResponse<T> {
  success: boolean;
  message?: string;
  data: T;
  meta?: PaginatedMeta;
}

type ControllerResponse<T> =
  | T
  | { data: T; message?: string; meta?: PaginatedMeta };

@Injectable()
export class ResponseMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const originalJson = res.json.bind(res);

    res.json = (body: ControllerResponse<any>) => {
      if (body && (body as any).success !== undefined) {
        return originalJson(body);
      }

      let response: GenericResponse<any>;

      if (body && (body as any).data !== undefined) {
        const { data, message, meta } = body as any;
        response = { success: true, data, message, meta };
      } else {
        response = { success: true, data: body };
      }

      if (
        Array.isArray(response.data) &&
        !response.meta &&
        req.query.page &&
        req.query.pageSize &&
        req.query.total
      ) {
        response.meta = {
          page: Number(req.query.page),
          pageSize: Number(req.query.pageSize),
          total: Number(req.query.total),
        };
      }

      return originalJson(response);
    };

    next();
  }
}
