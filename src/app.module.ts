//Common
import { Module } from '@nestjs/common';
//GraphQL
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
//Services
import { PrismaService } from './prisma/prisma.service';
import { UserService } from './user/user.service';
import { AuthService } from './auth/auth.service';
//Resolvers
import { AuthResolver } from './auth/auth.resolver';
//Modules
import { RecipesModule } from './recipes/recipes.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
    }),
    RecipesModule,
    AuthModule,
  ],
  providers: [PrismaService, UserService, AuthService, AuthResolver],
})
export class AppModule {}
