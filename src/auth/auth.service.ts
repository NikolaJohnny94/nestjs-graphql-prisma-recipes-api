// Core
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
//Bcrypt
import * as bcrypt from 'bcrypt';
// Services
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
// DTOs
import { CreateUserDTO } from 'src/shared/dto/create-user.dto';
import { SignInDTO } from './dto/sign-in.dto';
//Models
import { TokenResponse } from './models/token-response.model';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(signInDTO: SignInDTO): Promise<TokenResponse> {
    const { email, password } = signInDTO;

    const user = await this.usersService.getUser({ email });

    if (!user)
      throw new NotFoundException(
        `User with email: ${email} was not found in the Database`,
      );

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword)
      throw new UnauthorizedException('Incorect password. Pleaase try again.');

    const { tokenVersion: updatedTokenVersion } =
      await this.usersService.incrementTokenVersion(user.id);

    const access_token = await this.jwtService.signAsync(
      { sub: user.id, tokenVersion: updatedTokenVersion },
      { expiresIn: '15m' },
    );
    const refresh_token = await this.jwtService.signAsync(
      { sub: user.id },
      { expiresIn: '7d' },
    );

    await this.usersService.storeRefreshToken(user.id, refresh_token);

    return { refresh_token, access_token };
  }
  async signUp(signUpData: CreateUserDTO): Promise<TokenResponse> {
    const { password } = signUpData;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.usersService.createUser(
      {
        ...signUpData,
        password: hashedPassword,
      },
      {
        id: true,
        tokenVersion: true,
      },
    );

    const { tokenVersion: updatedTokenVersion } =
      await this.usersService.incrementTokenVersion(user.id);

    const access_token = await this.jwtService.signAsync(
      { sub: user.id, tokenVersion: updatedTokenVersion },
      { expiresIn: '1h' },
    );
    const refresh_token = await this.jwtService.signAsync(
      { sub: user.id },
      { expiresIn: '7d' },
    );

    await this.usersService.storeRefreshToken(user.id, refresh_token);

    return { refresh_token, access_token };
  }

  async signOut(userId: number): Promise<void> {
    await this.usersService.incrementTokenVersion(userId);
    await this.usersService.removeRefreshToken(userId);
  }

  async getNewAccessToken(
    userId: number,
    refreshToken: string,
  ): Promise<Pick<TokenResponse, 'access_token'>> {
    const user = await this.usersService.getUser({ id: userId });

    if (!user || user.refreshToken !== refreshToken) {
      await this.usersService.removeRefreshToken(userId);
      throw new UnauthorizedException('Invalid refresh token');
    }

    const { tokenVersion: updatedTokenVersion } =
      await this.usersService.incrementTokenVersion(userId);

    const access_token = await this.jwtService.signAsync(
      { sub: user.id, tokenVersion: updatedTokenVersion },
      { expiresIn: '15m' },
    );

    return { access_token };
  }
}
