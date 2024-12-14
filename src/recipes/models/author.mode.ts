import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Author {
  @Field(() => ID, { description: 'Unique identifier for the author' })
  id: number;

  @Field({ description: 'Name of the author' })
  name: string;

  @Field({ description: 'Email address of the author' })
  email?: string;
}
