// create-metodos-pago.dto.ts
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateMetodosPagoDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsString()
  descripcion: string;

  @IsNotEmpty()
  @IsString()
  @Length(4, 4)
  estado: string;
}
