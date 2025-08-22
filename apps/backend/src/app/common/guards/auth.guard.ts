import {
  CanActivate,
  ExecutionContext, ForbiddenException,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from '../decorators/is-public.decorator';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { ConfigServiceConstants } from '../../../../config/config-service.constants';
import { JwtPayload, UserRoles } from '@bookings-app/shared-types';

export type RequestWithUser = Request & {
  user: JwtPayload;
};

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    private config: ConfigService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    const roles = this.reflector.getAllAndOverride<UserRoles[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException('Token not found');
    }
    let payload: JwtPayload;
    try {
      payload = await this.jwtService.verifyAsync(token, {
        secret: this.config.get(ConfigServiceConstants.JWT_SECRET),
      });
      request['user'] = payload;
    } catch (e) {
      console.log(e);
      throw new UnauthorizedException('Invalid token');
    }
    if (roles && !roles.includes(payload.role)) {
      throw new ForbiddenException(
        'You are not authorized to access this resource'
      );
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
