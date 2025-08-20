import { Injectable, InternalServerErrorException, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { GenericResponseSchema, PaginatedMetaSchema, PaginatedResponseSchema } from '@bookings-app/shared-types';

@Injectable()
export class ResponseMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const originalJson = res.json.bind(res);

    res.json = (body: unknown) => {
      if (body && typeof body === 'object' && 'success' in (body as any)) {
        return originalJson(body);
      }

      let response: any;

      if (body && typeof body === 'object' && 'data' in (body as any)) {
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
        response.meta = PaginatedMetaSchema.parse({
          page: Number(req.query.page),
          pageSize: Number(req.query.pageSize),
          total: Number(req.query.total),
        });
      }

      try {
        if (Array.isArray(response.data) && response.meta) {
          response = PaginatedResponseSchema(z.any()).parse(response);
        } else {
          response = GenericResponseSchema(z.any()).parse(response);
        }
      } catch (e) {
        throw new InternalServerErrorException('Invalid response format');
      }

      return originalJson(response);
    };

    next();
  }
}
