import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
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

@ApiTags('Menus')
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get()
  @ApiOperation({ summary: 'Retrieve all menus' })
  @ApiResponse({
    status: 200,
    description: 'List of all menus',
    type: [MenuEntity],
  })
  async getAll() {
    return await this.menuService.getAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create a new menu' })
  @ApiBody({ type: CreateMenuDto, description: 'Payload to create a new menu' })
  @ApiResponse({ status: 201, description: 'Menu created successfully' })
  async create(@Body() request: CreateMenuDto) {
    return await this.menuService.createMenu(request);
  }

  @Post('/rol')
  @ApiOperation({ summary: 'Assign a menu to a role' })
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
  @ApiResponse({
    status: 200,
    description: 'Menu assigned to role successfully',
  })
  async addMenuToRole(
    @Query('nombre_menu') nombre_menu: string,
    @Query('nombre_rol') nombre_rol: string,
  ) {
    await this.menuService.addMenuToRole(nombre_menu, nombre_rol);
  }

  @Get('/rol/:nombre')
  @ApiOperation({ summary: 'Get menus by role name' })
  @ApiParam({
    name: 'nombre',
    type: String,
    description: 'Name of the role to retrieve menus for',
  })
  @ApiResponse({
    status: 200,
    description: 'List of menus associated with the role',
    type: [MenuEntity],
  })
  async getMenusByRoleName(@Param('nombre') nombre: string) {
    return await this.menuService.getMenusByRoleName(nombre);
  }
}
