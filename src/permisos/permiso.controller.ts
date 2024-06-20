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

@Controller('permiso')
@UseGuards(JwtAuthGuard, MenuAccessGuard)
@SetMetadata('menu', 'PERMISOS')
export class PermisoController {
  constructor(private readonly permisosService: PermisoService) {}

  @Get()
  @UseGuards(PermisoAccessGuard)
  @SetMetadata('permiso', 'VISUALIZAR')
  async findAll(): Promise<PermisoEntity[]> {
    return await this.permisosService.findAll();
  }

  @Get(':id')
  @UseGuards(PermisoAccessGuard)
  @SetMetadata('permiso', 'VISUALIZAR')
  async findOne(@Param('id') id: number): Promise<PermisoEntity> {
    return await this.permisosService.findOne(id);
  }

  @Post()
  @UseGuards(PermisoAccessGuard)
  @SetMetadata('permiso', 'CREAR')
  async create(
    @Body() createPermisoDto: CreatePermisoDto,
  ): Promise<PermisoEntity> {
    return await this.permisosService.create(createPermisoDto);
  }

  @Put(':id')
  @UseGuards(PermisoAccessGuard)
  @SetMetadata('permiso', 'EDITAR')
  async update(
    @Param('id') id: number,
    @Body() updatePermisoDto: UpdatePermisoDto,
  ): Promise<PermisoEntity> {
    return await this.permisosService.update(id, updatePermisoDto);
  }

  @Delete(':id')
  @UseGuards(PermisoAccessGuard)
  @SetMetadata('permiso', 'ELIMINAR')
  async remove(@Param('id') id: number): Promise<void> {
    return await this.permisosService.remove(id);
  }

  @Post('/rol-menu')
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
      return {
        mensaje,
      };
    } catch (error) {
      throw error;
    }
  }

  @Put('/estado/:estado')
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
      return {
        mensaje,
        estado,
      };
    } catch (error) {
      throw error;
    }
  }

  @Get('/rol/:nombre')
  @UseGuards(PermisoAccessGuard)
  @SetMetadata('permiso', 'VISUALIZAR')
  async getMenusByRoleName(@Param('nombre') nombre: string) {
    return await this.permisosService.getMenusPermisosByRol(nombre);
  }
}
