import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const HttpTokenData = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  return ctx.switchToHttp().getRequest().user;
});

export const SocketTokenData = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  return ctx.switchToWs().getClient()?.conn?.user;
});
