import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateProductoCarritoDto {
  @IsNotEmpty()
  @IsNumber()
  id_producto: number;

  @IsNotEmpty()
  @IsNumber()
  cantidad: number;
}
