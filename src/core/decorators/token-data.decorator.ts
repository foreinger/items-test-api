import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const HttpTokenData = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  return ctx.switchToHttp().getRequest().tokenPayload;
});

export const SocketTokenData = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  return ctx.switchToWs()?.getClient()?.conn?.tokenPayload;
});
