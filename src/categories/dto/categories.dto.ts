import { ApiProperty } from '@nestjs/swagger';

export class categoryDto {
  @ApiProperty({
    description: 'register field title category',
    example: 'example title',
  })
  title: string;

  @ApiProperty({
    description: 'register product in category',
  })
  productsId?: string[];
}
