import { IsString, IsNotEmpty } from 'class-validator';

export class CreateMenuDto {
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El nombre no puede estar vacio' })
  nombre: string;
}
