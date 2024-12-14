//Common
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
//GraphQL
import { GqlExecutionContext } from '@nestjs/graphql';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const gqlContext = GqlExecutionContext.create(ctx).getContext();
    return gqlContext.req.user.sub;
  },
);
