import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { IResponseUser } from 'src/types';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
@Injectable()
export class UsersService {
  constructor(
    @Inject(PrismaService)
    private readonly prisma: PrismaService,
  ) {}
  async create(data: CreateUserDto): Promise<IResponseUser> {
    const hash = await bcrypt.hash(data.password, 10);
    data.password = hash;
    const user = await this.prisma.user.create({
      data: {
        email: data.email,
        password: data.password,
      },
    });
    return user;
  }
  async findById(id: string): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: { id },
    });
    if (!user) {
      throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
    }
    return user;
  }
  async find(): Promise<IResponseUser[]> {
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return users;
  }

  async findEmail(email: string): Promise<IResponseUser> {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
      select: {
        id: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    if (!user) {
      throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
    }
    return user;
  }
  async addImage(id: string, url: string) {
    const product = await this.prisma.product.findFirst({
      where: { id },
    });
    if (!product) throw new NotFoundException('Product not found');
    const productUpdated = await this.prisma.product.update({
      where: { id },
      data: {
        urlImage: url,
      },
    });
    return productUpdated;
  }
}
