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
        productId: null,
      },
    });
    return category;
  }

  async findAll(): Promise<Category[]> {
    const categories = await this.prisma.category.findMany();
    return categories;
  }
}
