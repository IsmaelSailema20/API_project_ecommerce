import { IsNumber, IsString, IsNotEmpty, Length } from 'class-validator';
export class CreateRolesUsuario {
  @IsNumber()
  @Length(1, 20)
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
