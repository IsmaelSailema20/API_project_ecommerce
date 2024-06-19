import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { PermisoService } from './permiso.service';
import { PermisoEntity } from 'src/permisos/entities/permiso.entity';
import { UpdatePermisoDto } from './dtos/update-permiso.dto';
import { CreatePermisoDto } from './dtos/create-permiso.dto';

@Controller('permiso')
export class PermisoController {
  constructor(private readonly permisosService: PermisoService) {}

  @Get()
  async findAll(): Promise<PermisoEntity[]> {
    return await this.permisosService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<PermisoEntity> {
    return await this.permisosService.findOne(id);
  }

  @Post()
  async create(
    @Body() createPermisoDto: CreatePermisoDto,
  ): Promise<PermisoEntity> {
    return await this.permisosService.create(createPermisoDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updatePermisoDto: UpdatePermisoDto,
  ): Promise<PermisoEntity> {
    return await this.permisosService.update(id, updatePermisoDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return await this.permisosService.remove(id);
  }

  @Post('/rol-menu')
  async addPermisoToRolMenu(
    @Query('nombre_menu') nombre_menu: string,
    @Query('nombre_rol') nombre_rol: string,
    @Query('nombre_permiso') nombre_permiso: string,
  ) {
    await this.permisosService.addPermisoToRolMenu(
      nombre_menu,
      nombre_rol,
      nombre_permiso,
    );
  }

  @Get('/rol/:nombre')
  async getMenusByRoleName(@Param('nombre') nombre: string) {
    return await this.permisosService.getMenusPermisosByRol(nombre);
  }
}
