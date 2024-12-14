//Core
import { Reflector } from '@nestjs/core';
//Common
import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
//GraphQL
import { GqlExecutionContext } from '@nestjs/graphql';
//JWT
import { JwtService } from '@nestjs/jwt';
//Services
import { UserService } from 'src/user/user.service';
//Utils
import { extractTokenFromHeader } from 'src/auth/guards/utils/extractTokenFromHeder.util';
//Decorators
import { IS_PUBLIC_KEY } from 'src/shared/decorators/public.decorator';

@Injectable()
export class AuthGuard {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    private userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    const gqlContext = GqlExecutionContext.create(context).getContext();
    const request = gqlContext.req;

    const token = extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Token is missing');
    }

    try {
      const jwtPayload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });

      const user = await this.userService.getUser({ id: jwtPayload.sub });

      if (user && user.tokenVersion === jwtPayload.tokenVersion) {
        request['user'] = jwtPayload;
        return true;
      } else {
        throw new UnauthorizedException('Token is invalid or expired');
      }
    } catch (error) {
      console.error('JWT verification error:', error);
      throw new UnauthorizedException('Invalid token');
    }
  }
}
