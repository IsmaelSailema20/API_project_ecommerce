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
  readonly fecha: Date;

  @IsNotEmpty()
  @IsString()
  readonly hora_factura: string;

  @IsNotEmpty()
  @IsNumber()
  readonly total_factura: number;

  @IsNotEmpty()
  @IsNumber()
  readonly porcentaje_descuento: number;

  @IsNotEmpty()
  @IsNumber()
  readonly id_user: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateDetalleFacturaDto)
  readonly detallesFactura: CreateDetalleFacturaDto[];
}
