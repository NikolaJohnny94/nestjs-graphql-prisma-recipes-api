import { Test, TestingModule } from '@nestjs/testing';
import { RecipesResolver } from '../recipes.resolver';
import { PrismaService } from '../../prisma/prisma.service';
import { RecipesService } from '../recipes.service';

describe('RecipesResolver', () => {
  let resolver: RecipesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecipesResolver, RecipesService, PrismaService],
    }).compile();

    resolver = module.get<RecipesResolver>(RecipesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
