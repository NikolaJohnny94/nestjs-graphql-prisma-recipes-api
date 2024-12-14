//Modules
import { Module } from '@nestjs/common';
//Services
import { RecipesService } from './recipes.service';
import { PrismaService } from 'src/prisma/prisma.service';
//Resolvers
import { RecipesResolver } from './recipes.resolver';

@Module({
  providers: [RecipesService, RecipesResolver, PrismaService],
})
export class RecipesModule {}
