import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateDetallesNotasDeCreditoDto {
  /*@IsNotEmpty()
  @IsNumber()
  id_nota_credito: number;*/

  @IsNotEmpty()
  @IsNumber()
  id_producto: number;

  @IsNotEmpty()
  @IsNumber()
  cantidad: number;

  @IsNotEmpty()
  @IsNumber(
    { maxDecimalPlaces: 2 },
    {
      message: 'maximo 2 decimales',
    },
  )
  total_detalle: number;
}
