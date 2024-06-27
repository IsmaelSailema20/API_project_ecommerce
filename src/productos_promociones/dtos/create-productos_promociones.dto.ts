import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateProductosPromocionesDto {
  @IsInt()
  @IsNotEmpty()
  id_producto: number;

  @IsInt()
  @IsNotEmpty()
  id_promocion: number;
}
