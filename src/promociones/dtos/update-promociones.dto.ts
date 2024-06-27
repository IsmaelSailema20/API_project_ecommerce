import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class UpdatePromocionesDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 20)
  @IsOptional()
  descripcion?: string;

  @Type(() => Date)
  @IsNotEmpty()
  @IsOptional()
  fecha_inicio?: Date;

  @Type(() => Date)
  @IsNotEmpty()
  @IsOptional()
  fecha_fin?: Date;

  @IsNumber(
    { maxDecimalPlaces: 2 },
    {
      message: 'El descuento puede tener maximo 2 decimales',
    },
  )
  @IsNotEmpty()
  @IsOptional()
  descuento?: number;

  @IsString()
  @IsNotEmpty()
  @Length(1, 4)
  @IsOptional()
  estado?: string;
}
