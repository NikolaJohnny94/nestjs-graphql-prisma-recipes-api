import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Author } from './author.mode';

@ObjectType()
export class Recipe {
  @Field(() => ID, { description: 'Unique identifier for the recipe' })
  id: number;

  @Field({ description: 'Title of the recipe' })
  title: string;

  @Field({ description: 'Description of the recipe' })
  description: string;

  @Field(() => [String], {
    description: 'List of ingredients required for the recipe',
  })
  ingredients: string[];

  @Field(() => [String], {
    description: 'Categories that the recipe belongs to',
  })
  categories: string[];

  @Field({ description: 'Date when the recipe was created' })
  createdAt: Date;

  @Field({ description: 'Date when the recipe was last updated' })
  updatedAt: Date;

  @Field(() => Author, {
    description: 'Date when the recipe was last updated',
  })
  author?: Author;
}
