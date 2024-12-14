//GraphQL
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
//Decorators
import { CurrentUser, Public } from 'src/shared/decorators';
//Services
import { UserService } from './user.service';
//DTOs
import { UpdateUserDTO } from './dto/update-user.dto';
//Models
import { UserProfile, PublicUserProfile } from './models';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Query(() => PublicUserProfile, { description: 'Get public user profile' })
  async getPublicUserProfile(
    @Args('id', { type: () => Int }) userId: number,
  ): Promise<PublicUserProfile> {
    return this.userService.getUser(
      { id: userId },
      { name: true, recipes: true },
    );
  }

  @Query(() => UserProfile, { description: "Get user's own profile data" })
  async getProfile(@CurrentUser('id') userId: number): Promise<UserProfile> {
    return this.userService.getUser(
      {
        id: userId,
      },
      {
        name: true,
        email: true,
      },
    );
  }

  @Mutation(() => UserProfile, {
    description: "Update user's profile data (name, email and password)",
  })
  async updateProfile(
    @CurrentUser('id') userId: number,
    @Args('data', { type: () => UpdateUserDTO }) data: UpdateUserDTO,
  ): Promise<UserProfile> {
    return this.userService.updateUser(
      { where: { id: userId }, data },
      {
        name: true,
        email: true,
      },
    );
  }

  @Mutation(() => UserProfile, { description: "Delete user's profile" })
  async deleteProfile(@CurrentUser('id') userId: number): Promise<UserProfile> {
    return this.userService.deleteUser(
      { id: userId },
      {
        name: true,
        email: true,
      },
    );
  }
}
