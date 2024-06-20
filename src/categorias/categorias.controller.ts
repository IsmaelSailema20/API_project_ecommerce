import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CategoriasService } from './categorias.service';
import { CreateCategoriasDto } from './dtos/create-categorias.dto';
import { UpdateCategoriasDto } from './dtos/update-categorias.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { MenuAccessGuard } from 'src/auth/guards/menu_access.guard';
import { PermisoAccessGuard } from 'src/auth/guards/permiso_access.guard';

@ApiTags('Categorias')
@Controller('categorias')
@UseGuards(JwtAuthGuard, MenuAccessGuard)
@SetMetadata('menu', 'CATEGORIAS')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @Get()
  @UseGuards(PermisoAccessGuard)
  @SetMetadata('permiso', 'VISUALIZAR')
  async getAllCategorias() {
    return this.categoriasService.getAllCategorias();
  }

  @Get(':id')
  @UseGuards(PermisoAccessGuard)
  @SetMetadata('permiso', 'VISUALIZAR')
  async getOneCategoria(@Param('id') id: number) {
    return this.categoriasService.getOneCategoria(id);
  }

  @Post()
  @UseGuards(PermisoAccessGuard)
  @SetMetadata('permiso', 'CREAR')
  async createCategoria(@Body() createCategoriaDto: CreateCategoriasDto) {
    const newCategoria =
      await this.categoriasService.createCategoria(createCategoriaDto);
    if (newCategoria.success) {
      return { message: 'La categoria fue creada con exito', newCategoria };
    } else {
      return { message: newCategoria.message };
    }
  }

  @Put(':id')
  @UseGuards(PermisoAccessGuard)
  @SetMetadata('permiso', 'EDITAR')
  async updateCategoria(
    @Param('id') id: number,
    @Body() updateCategoriaDto: UpdateCategoriasDto,
  ) {
    const updateCategoria = await this.categoriasService.updateCategoria(
      id,
      updateCategoriaDto,
    );
    if (updateCategoria.success) {
      return {
        message: 'La categoria ha sido actualizada con exito',
        updateCategoria,
      };
    } else {
      return { message: updateCategoria.message };
    }
  }
}
