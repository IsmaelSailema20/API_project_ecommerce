import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { PermisoService } from './permiso.service';
import { PermisoEntity } from 'src/permisos/entities/permiso.entity';
import { UpdatePermisoDto } from './dtos/update-permiso.dto';
import { CreatePermisoDto } from './dtos/create-permiso.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { MenuAccessGuard } from 'src/auth/guards/menu_access.guard';
import { PermisoAccessGuard } from 'src/auth/guards/permiso_access.guard';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiParam,
  ApiQuery,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('Permisos')
@ApiBearerAuth()
@Controller('permiso')
@UseGuards(JwtAuthGuard, MenuAccessGuard)
@SetMetadata('menu', 'PERMISOS')
export class PermisoController {
  constructor(private readonly permisosService: PermisoService) {}

  @Get()
  @ApiOperation({ summary: 'Obtiene todos los permisos' })
  @UseGuards(PermisoAccessGuard)
  @SetMetadata('permiso', 'VISUALIZAR')
  async findAll(): Promise<PermisoEntity[]> {
    return await this.permisosService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtiene un permiso por su ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID del permiso',
  })
  @UseGuards(PermisoAccessGuard)
  @SetMetadata('permiso', 'VISUALIZAR')
  async findOne(@Param('id') id: number): Promise<PermisoEntity> {
    return await this.permisosService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crea un nuevo permiso' })
  @ApiBody({ type: CreatePermisoDto, description: 'Dto para crear un permiso' })
  @UseGuards(PermisoAccessGuard)
  @SetMetadata('permiso', 'CREAR')
  async create(
    @Body() createPermisoDto: CreatePermisoDto,
  ): Promise<PermisoEntity> {
    return await this.permisosService.create(createPermisoDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualiza un permiso por su ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID del permiso',
  })
  @ApiBody({
    type: UpdatePermisoDto,
    description: 'Dto para actualizar un permiso',
  })
  @UseGuards(PermisoAccessGuard)
  @SetMetadata('permiso', 'EDITAR')
  async update(
    @Param('id') id: number,
    @Body() updatePermisoDto: UpdatePermisoDto,
  ): Promise<PermisoEntity> {
    return await this.permisosService.update(id, updatePermisoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Elimina un permiso por su ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID del permiso',
  })
  @UseGuards(PermisoAccessGuard)
  @SetMetadata('permiso', 'ELIMINAR')
  async remove(@Param('id') id: number): Promise<void> {
    return await this.permisosService.remove(id);
  }

  @Post('/rol-menu')
  @ApiOperation({ summary: 'Asigna un permiso a un rol y menú' })
  @ApiQuery({
    name: 'nombre_menu',
    type: String,
    description: 'Nombre del menú',
  })
  @ApiQuery({
    name: 'nombre_rol',
    type: String,
    description: 'Nombre del rol',
  })
  @ApiQuery({
    name: 'nombre_permiso',
    type: String,
    description: 'Nombre del permiso',
  })
  @UseGuards(PermisoAccessGuard)
  @SetMetadata('permiso', 'CREAR')
  async addPermisoToRolMenu(
    @Query('nombre_menu') nombre_menu: string,
    @Query('nombre_rol') nombre_rol: string,
    @Query('nombre_permiso') nombre_permiso: string,
  ) {
    try {
      const mensaje = await this.permisosService.addPermisoToRolMenu(
        nombre_menu,
        nombre_rol,
        nombre_permiso,
      );
      return { mensaje };
    } catch (error) {
      throw error;
    }
  }

  @Put('/estado/:estado')
  @ApiOperation({ summary: 'Cambia el estado de un permiso' })
  @ApiParam({
    name: 'estado',
    type: String,
    description: 'Nuevo estado del permiso',
  })
  @ApiQuery({
    name: 'nombre_menu',
    type: String,
    description: 'Nombre del menú',
  })
  @ApiQuery({
    name: 'nombre_rol',
    type: String,
    description: 'Nombre del rol',
  })
  @ApiQuery({
    name: 'nombre_permiso',
    type: String,
    description: 'Nombre del permiso',
  })
  @UseGuards(PermisoAccessGuard)
  @SetMetadata('permiso', 'ELIMINAR')
  async cambiarEstadoPermiso(
    @Param('estado') estado: string,
    @Query('nombre_menu') nombre_menu: string,
    @Query('nombre_rol') nombre_rol: string,
    @Query('nombre_permiso') nombre_permiso: string,
  ) {
    try {
      const mensaje = await this.permisosService.cambiarEstadoPermiso(
        estado,
        nombre_menu,
        nombre_rol,
        nombre_permiso,
      );
      return { mensaje, estado };
    } catch (error) {
      throw error;
    }
  }

  @Get('/rol/:nombre')
  @ApiOperation({
    summary: 'Obtiene los menús y permisos de un rol por su nombre',
  })
  @ApiParam({
    name: 'nombre',
    type: String,
    description: 'Nombre del rol',
  })
  @UseGuards(PermisoAccessGuard)
  @SetMetadata('permiso', 'VISUALIZAR')
  async getMenusByRoleName(@Param('nombre') nombre: string) {
    return await this.permisosService.getMenusPermisosByRol(nombre);
  }
}
