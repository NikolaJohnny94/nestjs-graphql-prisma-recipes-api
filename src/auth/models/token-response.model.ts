import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class TokenResponse {
  @Field({
    description:
      'The access token used for authenticating API requests. This token has a short lifespan (usually 15 minutes).',
  })
  access_token: string;

  @Field({
    description:
      'The refresh token used to obtain a new access token when the current access token expires. This token has a longer lifespan (usually 7 days).',
  })
  refresh_token?: string;
}
