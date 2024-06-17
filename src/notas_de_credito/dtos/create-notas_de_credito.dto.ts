import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateDetallesNotasDeCreditoDto } from 'src/detalle_notas_de_credito/dtos/create-detalles_notas_de_credito.dto';

export class CreateNotasDeCreditoDto {
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  fecha: Date;

  @IsNotEmpty()
  @IsNumber()
  monto: number;

  @IsNotEmpty()
  @IsString()
  descripcion: string;

  @IsNotEmpty()
  @IsNumber()
  id_factura: number;

  @IsNotEmpty()
  @IsNumber()
  id_user: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateDetallesNotasDeCreditoDto)
  detallesFactura: CreateDetallesNotasDeCreditoDto[];
}
