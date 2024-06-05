import { IsOptional, Length, IsString } from 'class-validator';
export class UpdateRolDto {
  @IsString()
  @Length(1, 20)
  @IsOptional()
  nombre?: string;

  @IsString()
  @Length(1, 4)
  @IsOptional()
  estado_rol?: string;
}
