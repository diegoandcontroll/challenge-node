import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';

import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { categoryDto } from './dto/categories.dto';
@ApiTags('Categories')
@Controller('category')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @UseGuards(AuthGuard)
  @Post()
  @ApiBearerAuth('JWT-auth')
  create(@Body() data: categoryDto) {
    return this.categoriesService.create(data);
  }

  @UseGuards(AuthGuard)
  @Get()
  @ApiBearerAuth('JWT-auth')
  findAll() {
    return this.categoriesService.findAll();
  }
}
