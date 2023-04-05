import { User } from '@prisma/client';

export type IResponseUser = Pick<
  User,
  'email' | 'createdAt' | 'id' | 'updatedAt'
>;

export type authDto = {
  email: string;
  password: string;
};
