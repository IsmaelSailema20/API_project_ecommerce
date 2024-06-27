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
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { CategoriasService } from './categorias.service';
import { CreateCategoriasDto } from './dtos/create-categorias.dto';
import { UpdateCategoriasDto } from './dtos/update-categorias.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { MenuAccessGuard } from 'src/auth/guards/menu_access.guard';
import { PermisoAccessGuard } from 'src/auth/guards/permiso_access.guard';
import { CategoriasEntity } from './entities/categorias.entity';

@ApiTags('Categorias')
@ApiBearerAuth()
@Controller('categorias')
@UseGuards(JwtAuthGuard, MenuAccessGuard)
@SetMetadata('menu', 'CATEGORIAS')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @Get()
  @ApiOperation({ summary: 'Obtiene todas las categorías' })
  @ApiResponse({
    status: 200,
    description: 'Lista de todas las categorías',
    type: [CategoriasEntity],
  })
  @UseGuards(PermisoAccessGuard)
  @SetMetadata('permiso', 'VISUALIZAR')
  async getAllCategorias() {
    return this.categoriasService.getAllCategorias();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtiene una categoría por su ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID de la categoría',
  })
  @UseGuards(PermisoAccessGuard)
  @SetMetadata('permiso', 'VISUALIZAR')
  async getOneCategoria(@Param('id') id: number) {
    return this.categoriasService.getOneCategoria(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crea una nueva categoría' })
  @ApiBody({
    type: CreateCategoriasDto,
    description: 'Dto para crear una categoría',
  })
  @UseGuards(PermisoAccessGuard)
  @SetMetadata('permiso', 'CREAR')
  async createCategoria(@Body() createCategoriaDto: CreateCategoriasDto) {
    const newCategoria =
      await this.categoriasService.createCategoria(createCategoriaDto);
    if (newCategoria.success) {
      return { message: 'La categoría fue creada con éxito', newCategoria };
    } else {
      return { message: newCategoria.message };
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualiza una categoría por su ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID de la categoría',
  })
  @ApiBody({
    type: UpdateCategoriasDto,
    description: 'Dto para actualizar una categoría',
  })
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
        message: 'La categoría ha sido actualizada con éxito',
        updateCategoria,
      };
    } else {
      return { message: updateCategoria.message };
    }
  }
}
