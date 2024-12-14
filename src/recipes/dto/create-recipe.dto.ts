import { InputType, Field } from '@nestjs/graphql';
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateRecipeDTO {
  @Field({ description: 'Title of the recipe' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @Field({ description: 'Description of the recipe' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @Field(() => [String], { description: 'List of ingredients in the recipe' })
  @IsArray()
  @ArrayNotEmpty()
  ingredients: string[];

  @Field(() => [String], {
    description: 'List of categories the recipe belongs to',
  })
  @IsArray()
  @ArrayNotEmpty()
  categories: string[];
}
