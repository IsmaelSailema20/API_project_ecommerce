import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateNotasDeCreditoDto {
  @IsNotEmpty()
  @IsString()
  estado: string;
}
