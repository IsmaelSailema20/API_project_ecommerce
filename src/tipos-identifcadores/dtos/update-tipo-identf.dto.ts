import { IsString, Length, IsOptional } from 'class-validator';
export class UpdateTipoIdentfDto {
  @IsString()
  @Length(1, 20)
  @IsOptional()
  nombre?: string;

  @IsString()
  @Length(1, 4)
  @IsOptional()
  estado?: string;
}
