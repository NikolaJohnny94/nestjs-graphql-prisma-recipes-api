import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class UserProfile {
  @Field({ description: 'The full name of the user.' })
  name: string;

  @Field({ description: 'The email address of the user.' })
  email: string;
}
