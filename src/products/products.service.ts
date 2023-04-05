import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '@prisma/client';
import { CategoriesService } from 'src/categories/categories.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { productDto } from './dto/product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @Inject(PrismaService)
    private readonly prisma: PrismaService,
    private readonly categoriesService: CategoriesService,
  ) {}

  async create(data: productDto): Promise<Product> {
    const product = await this.prisma.product.create({
      data: {
        qty: data.qty,
        price: data.qty,
        title: data.title,
        categories: {
          connect: {
            id: data.categoriesId[0],
          },
        },
      },
    });
    return product;
  }

  async findAll() {
    const products = await this.prisma.product.findMany({
      select: {
        id: true,
        title: true,
        urlImage: true,
        price: true,
        qty: true,
        categories: {
          select: {
            id: true,
            title: true,
            parent: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    });
    return products;
  }

  async findOne(id: string) {
    const user = await this.prisma.product.findFirst({
      where: { id },
      select: {
        id: true,
        title: true,
        urlImage: true,
        price: true,
        qty: true,
        categories: {
          select: {
            id: true,
            title: true,
            parent: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    });
    if (!user) throw new NotFoundException('Product not found');

    return user;
  }

  async update(id: string, data: productDto): Promise<Product> {
    const user = this.findOne(id);
    if (!user) throw new NotFoundException('Product not found');
    return await this.prisma.product.update({
      where: { id },
      data: {
        title: data.title,
        price: data.price,
        qty: data.qty,
      },
    });
  }

  async remove(id: string): Promise<{ message: string }> {
    const user = this.findOne(id);
    if (!user) throw new NotFoundException('Product not found');
    await this.prisma.product.delete({
      where: { id },
    });
    return { message: 'Product Deleted' };
  }
}
