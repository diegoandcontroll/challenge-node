import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'register field name',
    example: 'name',
  })
  name: string;

  @ApiProperty({
    description: 'register field email',
    example: 'email@email.com',
  })
  email: string;

  @ApiProperty({
    description: 'register field password',
    example: 'password',
  })
  password: string;
}
