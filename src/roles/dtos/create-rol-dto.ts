import { IsString, IsNotEmpty, Length } from 'class-validator';
export class CreateRolfDto {
  @IsString()
  @Length(1, 20)
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @Length(1, 4)
  @IsNotEmpty()
  estado_rol: string;
}
