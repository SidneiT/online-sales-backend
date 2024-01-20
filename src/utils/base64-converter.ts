import { TokenPayloadDto } from 'src/modules/auth/dtos/token-payload.dto';

export const getPayloadFromJwt = (
  authorization: string,
): TokenPayloadDto | undefined => {
  const [, payload] = authorization.split('.');

  if (!payload) {
    return undefined;
  }

  return JSON.parse(Buffer.from(payload, 'base64').toString('ascii'));
};
