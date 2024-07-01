import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dtos/menu.dto';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { MenuAccessGuard } from 'src/auth/guards/menu_access.guard';
import { PermisoAccessGuard } from 'src/auth/guards/permiso_access.guard';

@ApiTags('Menus')
@Controller('menu')
@UseGuards(JwtAuthGuard, MenuAccessGuard)
@SetMetadata('menu', 'MENUS')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get()
  @ApiOperation({ summary: 'Obtiene todos los menús' })
  @UseGuards(PermisoAccessGuard)
  @SetMetadata('permiso', 'VISUALIZAR')
  async getAll() {
    return await this.menuService.getAll();
  }

  @Post()
  @ApiOperation({ summary: 'Crea nuevo menú' })
  @ApiBody({ type: CreateMenuDto, description: 'Dto para crear menu' })
  @UseGuards(PermisoAccessGuard)
  @SetMetadata('permiso', 'CREAR')
  async create(@Body() request: CreateMenuDto) {
    return await this.menuService.createMenu(request);
  }

  @Post('/rol')
  @ApiOperation({ summary: 'Asignar un menu a un rol' })
  @ApiQuery({
    name: 'nombre_menu',
    type: String,
    description: 'Nombre del menu a asignar',
  })
  @ApiQuery({
    name: 'nombre_rol',
    type: String,
    description: 'Nombre del rol a asignar el menú',
  })
  @UseGuards(PermisoAccessGuard)
  @SetMetadata('permiso', 'CREAR')
  async addMenuToRole(
    @Query('nombre_menu') nombre_menu: string,
    @Query('nombre_rol') nombre_rol: string,
  ) {
    try {
      await this.menuService.addMenuToRole(nombre_menu, nombre_rol);
      return {
        mensaje: `Se agrego el menú ${nombre_menu} al rol ${nombre_rol}`,
      };
    } catch (error) {
      throw error;
    }
  }

  @Get('/rol/:nombre')
  @ApiOperation({ summary: 'Obtener los menus de un rol' })
  @ApiParam({
    name: 'nombre',
    type: String,
    description: 'Nombre del rol para obtener los menús',
  })
  @UseGuards(PermisoAccessGuard)
  @SetMetadata('permiso', 'VISUALIZAR')
  async getMenusByRoleName(@Param('nombre') nombre: string) {
    return await this.menuService.getMenusByRoleName(nombre);
  }
}
