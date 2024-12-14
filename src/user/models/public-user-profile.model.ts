//GraphQL
import { ObjectType, Field } from '@nestjs/graphql';
//Models
import { Recipe } from 'src/recipes/models/recipe.model';

@ObjectType()
export class PublicUserProfile {
  @Field({ description: 'The full name of the user.' })
  name: string;

  @Field(() => [Recipe], { description: 'Recipes created by the user' })
  recipes: Recipe[];
}
