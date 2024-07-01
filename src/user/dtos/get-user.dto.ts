import { IsString, IsDate, IsNotEmpty, IsEmail, Length } from 'class-validator';

import { Expose, Type } from 'class-transformer';
export class CreateOtherPersonDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  apellido: string;

  @IsString()
  @IsNotEmpty()
  direccion: string;

  @IsString()
  @Length(10)
  @IsNotEmpty()
  celular: string;

  @IsString()
  @Length(6)
  telefono: string;

  @IsEmail()
  @IsNotEmpty()
  correo: string;

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date) // Transformación automática
  fechaNacimiento: Date;

  @IsString()
  @Length(10)
  @IsNotEmpty()
  identificacion: string;

  @IsNotEmpty()
  id_tipo_identificacion: number;
}

export class GetUserDto {
  @Expose()
  id_usuario: string;
  @Expose()
  username: string;
  @Expose()
  password: string;
  @Expose()
  fecha_creacion: Date;
  @Expose()
  estado_usuario: string;
  @Expose()
  estado_cuenta: string;
  @Expose()
  fecha_ultima_conexion: Date;
  roles: string[];
  @Expose()
  person: CreateOtherPersonDto;
}
