import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateMarcasDto {
  @IsString()
  @Length(1, 20)
  @IsNotEmpty()
  nombre: string;
}
