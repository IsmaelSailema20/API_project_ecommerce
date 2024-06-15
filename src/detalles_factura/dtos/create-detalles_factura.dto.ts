// create-detalle-factura.dto.ts
import { IsNotEmpty, IsNumber, IsDecimal } from 'class-validator';

export class CreateDetalleFacturaDto {
  @IsNotEmpty()
  @IsNumber()
  id_producto: number;

  @IsNotEmpty()
  @IsDecimal()
  total_detalle: number;

  @IsNotEmpty()
  @IsDecimal()
  porcentaje_descuento: number;

  @IsNotEmpty()
  @IsNumber()
  cantidad: number;

  @IsNotEmpty()
  @IsNumber()
  id_factura: number;
}
