//GraphQL
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
//Services
import { RecipesService } from './recipes.service';
//Decorators
import { CurrentUser, Public } from 'src/shared/decorators';
//Utils
import { buildSearchQuery } from './utils';
//DTO
import { CreateRecipeDTO, UpdateRecipeDTO } from './dto';
//Models
import { Recipe } from './models/recipe.model';

@Resolver(() => Recipe)
export class RecipesResolver {
  constructor(private recipesService: RecipesService) {}

  @Public()
  @Query(() => [Recipe], { description: 'Get all recipes' })
  async getAllRecipes(): Promise<Recipe[]> {
    return this.recipesService.findAll();
  }

  @Public()
  @Query(() => Recipe, { description: 'Get public recipe' })
  async getPublicRecipe(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<any> {
    return this.recipesService.checkIfRecipeExists({ id });
  }

  @Query(() => [Recipe], { description: 'Get own recipes' })
  async getOwnRecipes(@CurrentUser('id') userId: number): Promise<Recipe[]> {
    return this.recipesService.findAll({ author: { id: userId } });
  }

  @Query(() => Recipe, { description: 'Get own recipe' })
  async getOwnRecipe(
    @CurrentUser('id') userId: number,
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Recipe> {
    return this.recipesService.checkIfRecipeExists({ id, userId });
  }

  @Query(() => [Recipe], { description: 'Search through ownrecipes' })
  async searchOwnRecipes(
    @CurrentUser('id') userId: number,
    @Args('query') query: string,
  ): Promise<Recipe | Recipe[]> {
    const searchQuery = buildSearchQuery(query, userId);
    return this.recipesService.findAll(searchQuery);
  }

  @Public()
  @Query(() => [Recipe], {
    description: 'Search through all published recipes',
  })
  async searchPublicRecipes(
    @Args('query') query: string,
  ): Promise<Recipe | Recipe[]> {
    const searchQuery = buildSearchQuery(query);
    return this.recipesService.findAll(searchQuery);
  }

  @Mutation(() => Recipe, { description: 'Create new recipe' })
  async createRecipe(
    @CurrentUser('id') userId: number,
    @Args('data', { type: () => CreateRecipeDTO }) data: CreateRecipeDTO,
  ): Promise<Recipe> {
    return this.recipesService.create({
      ...data,
      author: { connect: { id: userId } },
    });
  }

  @Mutation(() => Recipe, { description: 'Update own recipe' })
  async updateRecipe(
    @CurrentUser('id') userId: number,
    @Args('id', { type: () => Int }) id: number,
    @Args('data', { type: () => UpdateRecipeDTO }) data: UpdateRecipeDTO,
  ): Promise<Recipe> {
    await this.recipesService.checkIfRecipeExists({ id, userId });
    return this.recipesService.update(id, data);
  }

  @Mutation(() => Recipe, { description: 'Delete own recipe' })
  async deleteRecipe(
    @CurrentUser('id') userId: number,
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Recipe> {
    await this.recipesService.checkIfRecipeExists({ id, userId });
    return this.recipesService.delete(id);
  }
}
