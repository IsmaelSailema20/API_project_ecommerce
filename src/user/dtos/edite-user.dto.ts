import {
  IsString,
  IsDate,
  IsOptional,
  IsEmail,
  Length,
  MinLength,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreatePersonDto } from './create-user.dto';
export class EditPersonDto {
  @IsString()
  @IsOptional()
  nombre?: string;

  @IsString()
  @IsOptional()
  apellido?: string;

  @IsString()
  @IsOptional()
  direccion?: string;

  @IsString()
  @Length(10)
  @IsOptional()
  celular?: string;

  @IsString()
  @IsOptional()
  telefono?: string;

  @IsEmail()
  @IsOptional()
  correo?: string;

  @IsDate()
  @Type(() => Date) // Transformación automática
  fechaNacimiento: Date;

  @IsString()
  @Length(10)
  @IsOptional()
  identificacion?: string;

  @IsNumber()
  @IsOptional()
  id_tipo_identificacion?: number;
}

export class EditUserDto {
  @IsString()
  @IsOptional()
  username?: string;

  @IsString()
  @IsOptional()
  @MinLength(8)
  passwordU?: string;

  @IsString()
  @Length(3)
  @IsOptional()
  estado_usuario?: string;

  @IsString()
  @Length(3)
  @IsOptional()
  estado_cuenta?: string;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  fecha_creacion?: Date;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  fecha_ultima_conexion?: Date;

  @IsOptional()
  person?: Partial<CreatePersonDto>;
}
