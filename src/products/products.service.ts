import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Product, Category } from '@prisma/client';
import { CategoriesService } from 'src/categories/categories.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { productDto } from 'src/types';

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
            id: data.categoryId,
          },
        },
      },
    });
    // if (categories) {
    //   await this.prisma.product.update({
    //     where: { id: product.id },
    //     data: {
    //       categories: {
    //         connect: [categories],
    //       },
    //     },
    //   });
    //   await this.prisma.category.update({
    //     where: { id: categories.id },
    //     data: {
    //       productId: product.id,
    //     },
    //   });
    // }
    return product;
  }

  async findAll(): Promise<Product[]> {
    const products = await this.prisma.product.findMany({
      include: {
        categories: true,
      },
    });
    return products;
  }

  async findOne(id: string): Promise<Product> {
    const user = await this.prisma.product.findFirst({
      where: { id },
      include: {
        categories: true,
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
