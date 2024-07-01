import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreatePromocionesDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 20)
  descripcion: string;

  @Type(() => Date)
  @IsNotEmpty()
  fecha_inicio: Date;

  @Type(() => Date)
  @IsNotEmpty()
  fecha_fin: Date;

  @IsString()
  @IsNotEmpty()
  @Length(1, 4)
  estado: string;
}
