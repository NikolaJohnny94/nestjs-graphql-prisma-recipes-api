//Core
import { Module } from '@nestjs/common';
//Services
import { UserService } from './user.service';
//Modules
import { PrismaModule } from 'src/prisma/prisma.module';
//Resolvers
import { UserResolver } from './user.resolver';

@Module({
  imports: [PrismaModule],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}
