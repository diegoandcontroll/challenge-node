import { Category, User } from '@prisma/client';

export type IResponseUser = Pick<
  User,
  'email' | 'createdAt' | 'id' | 'updatedAt'
>;

export type authDto = {
  email: string;
  password: string;
};

export type categoryDto = {
  title: string;
  productId?: string;
};

export type productDto = {
  title: string;
  qty: number;
  price: number;
  categoryId?: string;
};
