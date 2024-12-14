//GraphQL
import { InputType, PartialType } from '@nestjs/graphql';
//DTO
import { CreateRecipeDTO } from './create-recipe.dto';

@InputType()
export class UpdateRecipeDTO extends PartialType(CreateRecipeDTO) {}
