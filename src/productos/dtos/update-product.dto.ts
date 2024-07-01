import {
  IsNumber,
  IsOptional,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';
export class UpdateProductDto {
  @IsString()
  @Length(1, 50)
  @IsOptional()
  nombre?: string;

  @IsNumber(
    { maxDecimalPlaces: 3 },
    {
      message: 'Precio unitario puede tener maximo 3 decimales',
    },
  )
  @IsOptional()
  precioUnitario?: number;

  @IsNumber()
  @IsOptional()
  stock?: number;

  @IsString()
  @MaxLength(4)
  @IsOptional()
  estadoProducto?: string;

  @IsString()
  @Length(1, 100)
  @IsOptional()
  descripcion?: string;

  @IsOptional()
  @IsNumber()
  id_marca?: number;

  @IsOptional()
  @IsNumber()
  id_categoria?: number;
}
