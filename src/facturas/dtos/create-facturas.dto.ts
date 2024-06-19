// create-factura.dto.ts
import {
  IsNotEmpty,
  IsDate,
  IsString,
  IsNumber,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateDetalleFacturaDto } from 'src/detalles_factura/dtos/create-detalles_factura.dto';

export class CreateFacturaDto {
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  fecha: Date;

  @IsNotEmpty()
  @IsString()
  hora_factura: string;

  @IsNotEmpty()
  @IsNumber()
  total_factura: number;

  @IsNotEmpty()
  @IsNumber()
  porcentaje_descuento: number;

  @IsNotEmpty()
  @IsNumber()
  id_user: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateDetalleFacturaDto)
  detallesFactura: CreateDetalleFacturaDto[];

  @IsNotEmpty()
  @IsNumber()
  id_metodo_pago: number;
}
