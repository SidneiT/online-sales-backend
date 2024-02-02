import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { getPayloadFromJwt } from '../utils/base64-converter';

export const UserId = createParamDecorator((_, ctx: ExecutionContext) => {
  const { authorization } = ctx.switchToHttp().getRequest().headers;

  const payload = getPayloadFromJwt(authorization);

  return payload?.id;
});
