import { ApiProperty } from '@nestjs/swagger';

export class productDto {
  @ApiProperty({
    description: 'register field email',
    example: 'email@email.com',
  })
  title: string;

  @ApiProperty({
    description: 'register field quantity',
    example: 10,
  })
  qty: number;

  @ApiProperty({
    description: 'register field price',
    example: 6.45,
  })
  price: number;

  @ApiProperty({
    description: 'register category in product',
  })
  categoriesId?: string[];
}
