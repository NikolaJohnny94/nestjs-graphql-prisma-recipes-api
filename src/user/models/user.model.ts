import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Recipe } from 'src/recipes/models/recipe.model';

@ObjectType()
export class User {
  @Field(() => ID, { description: 'Unique identifier for the user' })
  id: number;

  @Field({ description: 'Email address of the user' })
  email: string;

  @Field({ description: 'Name of the user' })
  name: string;

  @Field({ description: 'Hashed password of the user' })
  password: string;

  @Field({ nullable: true, description: 'Refresh token for authentication' })
  refreshToken?: string;

  @Field({ description: 'Token version for invalidating tokens' })
  tokenVersion: number;

  @Field(() => [Recipe], { description: 'Recipes created by the user' })
  recipes: Recipe[];
}
