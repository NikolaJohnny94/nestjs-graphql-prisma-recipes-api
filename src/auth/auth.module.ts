//Core
import { Module } from '@nestjs/common';
// Services
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
//Resolvers
import { AuthResolver } from './auth.resolver';
//Modules
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserModule } from 'src/user/user.module';
//Providers
import { AppGuardProvider } from './providers/app-guard.provider';
//Config
import { config } from './config';

@Module({
  imports: [PrismaModule, UserModule, JwtModule.register(config.jwt)],
  providers: [AuthService, AuthResolver, AppGuardProvider],
})
export class AuthModule {}
