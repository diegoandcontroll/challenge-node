import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CloudinaryService } from 'src/utils/cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() data: CreateUserDto) {
    return this.usersService.create(data);
  }
  @UseGuards(AuthGuard)
  @Post('image/:id')
  @ApiConsumes('multipart/form-data')
  @ApiBearerAuth('JWT-auth')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: string,
  ) {
    const cloudinaryService = new CloudinaryService(
      `${process.env.CLOUD_NAME}`,
      `${process.env.API_KEY}`,
      `${process.env.API_SECRET}`,
    );
    const result = await cloudinaryService.uploadImage(file);

    return await this.usersService.addImage(id, result);
  }
  @UseGuards(AuthGuard)
  @Get()
  @ApiBearerAuth('JWT-auth')
  findAll() {
    return this.usersService.find();
  }
  @Get(':email')
  @ApiBearerAuth('JWT-auth')
  findEmail(@Param('email') email: string) {
    return this.usersService.findEmail(email);
  }
}
