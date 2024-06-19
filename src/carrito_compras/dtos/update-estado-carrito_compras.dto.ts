import { IsNotEmpty, IsString, Length } from 'class-validator';

export class UpdateCarritoEstadoDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 4)
  estado: string;
}
