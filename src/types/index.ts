import { User } from '@prisma/client';

export type IResponseUser = Pick<
  User,
  'email' | 'createdAt' | 'id' | 'updatedAt'
>;
export type IResponseProduct = {
  id: string;
  title: string;
  urlImage: string;
  price: string;
  qty: string;
  categories: Category;
  createdAt: string;
  updatedAt: string;
};
type Category = {
  id: string;
  title: string;
  parent: string | null;
  createdAt: string;
  updatedAt: string;
};
export type authDto = {
  email: string;
  password: string;
};

export type categoryDto = {
  title: string;
  productsId?: string[];
};

export type productDto = {
  title: string;
  qty: number;
  price: number;
  categoriesId?: string[];
};
