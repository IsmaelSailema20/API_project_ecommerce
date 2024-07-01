import {
  IsString,
  IsDate,
  IsNotEmpty,
  IsEmail,
  Length,
  MinLength,
  IsNumber,
} from 'class-validator';

import { Type } from 'class-transformer';
export class CreatePersonDto {
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

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  fecha_creacion: Date;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsString()
  @Length(3)
  @IsNotEmpty()
  estado_usuario: string;

  @IsString()
  @Length(3)
  @IsNotEmpty()
  estado_cuenta: string;

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  fecha_ultima_conexion: Date;

  @IsNotEmpty()
  @IsNumber()
  id_rol: number;

  @IsNotEmpty()
  person: CreatePersonDto;
}
