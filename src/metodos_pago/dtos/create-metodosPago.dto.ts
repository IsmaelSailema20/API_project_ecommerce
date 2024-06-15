// create-metodos-pago.dto.ts
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateMetodosPagoDto {
  @IsNotEmpty()
  @IsString()
  readonly nombre: string;

  @IsNotEmpty()
  @IsString()
  readonly descripcion: string;

  @IsNotEmpty()
  @IsString()
  @Length(4, 4)
  readonly estado: string;
}
