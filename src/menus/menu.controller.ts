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
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { MenuEntity } from './entities/menu.entity';
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
  @ApiOperation({ summary: 'Obtiene todos los menus' })
  @ApiResponse({
    status: 200,
    description: 'List of all menus',
    type: [MenuEntity],
  })
  @UseGuards(PermisoAccessGuard)
  @SetMetadata('permiso', 'VISUALIZAR')
  async getAll() {
    return await this.menuService.getAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create a new menu' })
  @ApiBody({ type: CreateMenuDto, description: 'Payload to create a new menu' })
  @ApiResponse({ status: 201, description: 'Menu created successfully' })
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
    description: 'Name of the menu to assign',
  })
  @ApiQuery({
    name: 'nombre_rol',
    type: String,
    description: 'Name of the role to assign the menu to',
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
  @ApiOperation({ summary: 'Get menus by role name' })
  @ApiParam({
    name: 'nombre',
    type: String,
    description: 'Name of the role to retrieve menus for',
  })
  @UseGuards(PermisoAccessGuard)
  @SetMetadata('permiso', 'VISUALIZAR')
  async getMenusByRoleName(@Param('nombre') nombre: string) {
    return await this.menuService.getMenusByRoleName(nombre);
  }
}
