//Common
import { Injectable, NotFoundException } from '@nestjs/common';
//Prisma
import { Prisma } from '@prisma/client';
//Services
import { PrismaService } from '../prisma/prisma.service';
//Utils
import { normalizeArray } from './utils';
//Models
import { Recipe } from './models/recipe.model';
@Injectable()
export class RecipesService {
  constructor(private prisma: PrismaService) {}

  async findAll(
    recipeWhereUniqueInput?: Prisma.RecipeWhereInput,
  ): Promise<Recipe[]> {
    return this.prisma.recipe.findMany({
      where: recipeWhereUniqueInput,
      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async findOne(
    recipeWereUniqueInput?: Prisma.RecipeWhereUniqueInput,
  ): Promise<Recipe> {
    return this.prisma.recipe.findUnique({
      where: recipeWereUniqueInput,
      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async checkIfRecipeExists({
    id,
    userId,
  }: {
    id: number;
    userId?: number;
  }): Promise<Recipe> {
    const recipe = await this.findOne(
      userId ? { id, author: { id: userId } } : { id },
    );

    if (!recipe) {
      throw new NotFoundException(`Recipe with Id: ${id} not found in the DB.`);
    }

    return recipe;
  }

  async create(data: Prisma.RecipeCreateInput): Promise<Recipe> {
    const normalizedIngredients = normalizeArray(data.ingredients as string[]);
    const normalizedCategories = normalizeArray(data.categories as string[]);

    return this.prisma.recipe.create({
      data: {
        ...data,
        ingredients: normalizedIngredients,
        categories: normalizedCategories,
      },
    });
  }

  async update(id: number, data: Prisma.RecipeUpdateInput): Promise<Recipe> {
    return this.prisma.recipe.update({
      where: { id },
      data,
      include: { author: { select: { id: true, name: true } } },
    });
  }

  async delete(id: number): Promise<Recipe> {
    return this.prisma.recipe.delete({
      where: { id },
      include: { author: { select: { id: true, name: true } } },
    });
  }
}
