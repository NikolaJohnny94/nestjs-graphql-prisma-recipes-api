// GraphQL
import { Resolver, Mutation, Args } from '@nestjs/graphql';
// Services
import { AuthService } from './auth.service';
//Decorators
import { Public } from 'src/shared/decorators/public.decorator';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
// DTOs
import { CreateUserDTO } from 'src/shared/dto/create-user.dto';
import { SignInDTO } from './dto/sign-in.dto';
// Models
import { TokenResponse } from './models/token-response.model';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Mutation(() => TokenResponse, { description: 'Sign up a new user' })
  async signUp(
    @Args('signUpData', { type: () => CreateUserDTO })
    signUpData: CreateUserDTO,
  ): Promise<TokenResponse> {
    return this.authService.signUp(signUpData);
  }

  @Public()
  @Mutation(() => TokenResponse, { description: 'Sign in an existing user' })
  async signIn(
    @Args('signInData', { type: () => SignInDTO }) signInData: SignInDTO,
  ): Promise<TokenResponse> {
    return this.authService.signIn(signInData);
  }

  @Mutation(() => String, { description: 'Sign out the current user' })
  async signOut(@CurrentUser('id') userId: number): Promise<string> {
    await this.authService.signOut(userId);
    return 'User signed out successfully!';
  }

  @Mutation(() => TokenResponse, { description: 'Get a new access token' })
  async refreshAccessToken(
    @CurrentUser('id') userId: number,
    @Args('refreshToken') refreshToken: string,
  ): Promise<TokenResponse> {
    const { access_token } = await this.authService.getNewAccessToken(
      userId,
      refreshToken,
    );
    return { access_token };
  }
}
