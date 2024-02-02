import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { TokenPayloadDto } from '../modules/auth/dtos/token-payload.dto';
import { UserType } from '../modules/user/enums/user-type.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<UserType[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true;
    }

    const { authorization } = context.switchToHttp().getRequest().headers;

    const tokenPayload: TokenPayloadDto | undefined = await this.jwtService
      .verifyAsync(authorization, {
        secret: process.env.TOKEN_SECRET,
      })
      .catch(() => undefined);

    if (!tokenPayload) {
      return false;
    }

    return requiredRoles.some((role) => role === tokenPayload.typeUser);
  }
}
