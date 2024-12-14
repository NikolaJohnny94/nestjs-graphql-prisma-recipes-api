// Core
import { Injectable } from '@nestjs/common';
// Prisma
import { Prisma } from '@prisma/client';
// Services
import { PrismaService } from 'src/prisma/prisma.service';
// // DTOs
import { CreateUserDTO } from 'src/shared/dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
//Models
import { User } from './models/user.model';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findUser(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
    select?: Prisma.UserSelect,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
      select,
    });
  }

  async getUser(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
    select?: Prisma.UserSelect,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
      select,
    });
  }

  async createUser(
    data: CreateUserDTO,
    select?: Prisma.UserSelect,
  ): Promise<User> {
    return this.prisma.user.create({
      data,
      select,
    });
  }

  async updateUser(
    params: {
      where: Prisma.UserWhereUniqueInput;
      data: UpdateUserDTO;
    },
    select?: Prisma.UserSelect,
  ): Promise<User> {
    const { where, data } = params;
    return this.prisma.user.update({
      where,
      data,
      select,
    });
  }

  async deleteUser(
    where: Prisma.UserWhereUniqueInput,
    select?: Prisma.UserSelect,
  ): Promise<User> {
    return this.prisma.user.delete({
      where,
      select,
    });
  }

  async storeRefreshToken(
    userId: number,
    refreshToken: string,
  ): Promise<{ refreshToken: string }> {
    return this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken },
      select: { refreshToken: true },
    });
  }

  async removeRefreshToken(userId: number): Promise<{ refreshToken: string }> {
    return this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken: null },
      select: { refreshToken: true },
    });
  }

  async incrementTokenVersion(
    userId: number,
  ): Promise<{ tokenVersion: number }> {
    return this.prisma.user.update({
      where: { id: userId },
      data: { tokenVersion: { increment: 1 } },
      select: { tokenVersion: true },
    });
  }
}
