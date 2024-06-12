import { IsString, IsNotEmpty, Length } from 'class-validator';

export class MenuDto {
  @IsString()
  @Length(1, 20)
  @IsNotEmpty()
  nombre: string;
}
