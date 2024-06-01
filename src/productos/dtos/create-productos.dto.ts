import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';

export class CreateProductosDto {
  @IsString()
  @Length(1, 50)
  @IsNotEmpty()
  nombre: string;

  @IsNumber(
    { maxDecimalPlaces: 3 },
    {
      message: 'Precio unitario puede tener maximo 3 decimales',
    },
  )
  @IsNotEmpty()
  precioUnitario: number;

  @IsNumber()
  @IsNotEmpty()
  stock: number;

  @IsString()
  @MaxLength(4)
  @IsNotEmpty()
  estadoProducto: string;

  @IsString()
  @Length(1, 100)
  @IsNotEmpty()
  descripcion: string;

  @IsNotEmpty()
  @IsNumber()
  id_marca: number;

  @IsNotEmpty()
  @IsNumber()
  id_categoria: number;
}
