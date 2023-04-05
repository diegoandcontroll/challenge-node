import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [
    PrismaModule,
    ProductsModule,
    MulterModule.registerAsync({
      useFactory: () => ({
        dest: './upload',
        storage: diskStorage({
          destination: './uploads',
          filename: (req, file, cb) => {
            const randomName = Array(32)
              .fill(null)
              .map(() => Math.round(Math.random() * 16).toString(16))
              .join('');
            return cb(null, `${randomName}${file.originalname}`);
          },
        }),
      }),
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
