import { IsString, Length, IsNotEmpty } from 'class-validator';
export class CreateTipoIdentfDto {
  @IsString()
  @Length(1, 20)
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @Length(1, 4)
  @IsNotEmpty()
  estado: string;
}
