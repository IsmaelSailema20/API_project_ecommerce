import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';
import { CreateProductosCarritoComprasDto } from 'src/productos_carritos_compras/dtos/create-productos_carrito_compras.dto';

export class CreateCarritoComprasDto {
  @IsNotEmpty()
  @IsNumber()
  id_usuario: number;

  @IsNotEmpty()
  @IsString()
  @Length(1, 4)
  estado: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateProductosCarritoComprasDto)
  productosCarrito: CreateProductosCarritoComprasDto[];
}
