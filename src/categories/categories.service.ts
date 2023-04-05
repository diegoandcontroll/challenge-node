import { Inject, Injectable } from '@nestjs/common';
import { Category } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { categoryDto } from 'src/types';

@Injectable()
export class CategoriesService {
  constructor(
    @Inject(PrismaService)
    private prisma: PrismaService,
  ) {}
  async create(data: categoryDto): Promise<Category> {
    const category = await this.prisma.category.create({
      data: {
        title: data.title,
        productId: data.productId ? data.productId : null,
      },
    });
    return category;
  }
  async findOne(id: string): Promise<Category> {
    return await this.prisma.category.findFirst({
      where: { id },
    });
  }
  async findAll(): Promise<Category[]> {
    const categories = await this.prisma.category.findMany({
      include: {
        Product: true,
      },
    });
    return categories;
  }
}
