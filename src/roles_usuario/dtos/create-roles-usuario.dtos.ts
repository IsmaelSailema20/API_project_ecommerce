import { IsNumber, IsString, IsNotEmpty, Length } from 'class-validator';
export class CreateRolesUsuario {
  @IsNumber()
  @IsNotEmpty()
  ID_usuario: number;

  @IsNumber()
  @IsNotEmpty()
  ID_rol: number;

  @IsString()
  @Length(1, 4)
  @IsNotEmpty()
  estado: string;
}
