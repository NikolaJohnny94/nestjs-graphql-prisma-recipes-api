import { Prisma } from '@prisma/client';

export function buildSearchQuery(
  query: string,
  userId?: number,
): Prisma.RecipeWhereInput {
  const lowerCaseQuery = query.toLowerCase();
  const searchFilter: Prisma.RecipeWhereInput = {
    OR: [
      {
        title: { contains: query, mode: 'insensitive' },
      },
      {
        description: { contains: query, mode: 'insensitive' },
      },
      {
        ingredients: { hasSome: [lowerCaseQuery] },
      },
      {
        categories: { hasSome: [lowerCaseQuery] },
      },
    ],
  };

  if (userId) {
    return {
      AND: [searchFilter, { author: { id: userId } }],
    };
  }

  return searchFilter;
}
