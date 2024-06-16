// create-detalle-factura.dto.ts
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateDetalleFacturaDto {
  @IsNotEmpty()
  @IsNumber()
  id_producto: number;

  @IsNotEmpty()
  @IsNumber(
    { maxDecimalPlaces: 3 },
    {
      message: 'maximo 3 decimales',
    },
  )
  total_detalle: number;

  @IsNotEmpty()
  @IsNumber(
    { maxDecimalPlaces: 3 },
    {
      message: 'maximo 3 decimales',
    },
  )
  porcentaje_descuento: number;

  @IsNotEmpty()
  @IsNumber()
  cantidad: number;
  /*
  @IsNotEmpty()
  @IsNumber()
  id_factura: number;*/
}
