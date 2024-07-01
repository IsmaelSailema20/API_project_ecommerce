import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
import { CreateProductosCarritoComprasDto } from 'src/productos_carritos_compras/dtos/create-productos_carrito_compras.dto';

export class UpdateCarritoCompras {
  @IsNotEmpty()
  @IsNumber()
  id_usuario: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateProductosCarritoComprasDto)
  productosCarrito: CreateProductosCarritoComprasDto[];
}
