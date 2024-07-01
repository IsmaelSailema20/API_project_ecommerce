import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateProductosCarritoComprasDto {
  @IsNotEmpty()
  @IsNumber()
  id_producto: number;

  @IsNotEmpty()
  @IsNumber()
  cantidad: number;
}
