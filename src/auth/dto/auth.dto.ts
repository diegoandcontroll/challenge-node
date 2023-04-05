import { ApiProperty } from '@nestjs/swagger';

export class authDto {
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
