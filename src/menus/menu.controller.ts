import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dtos/menu.dto';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get()
  async getAll() {
    return await this.menuService.getAll();
  }

  @Post()
  async create(@Body() request: CreateMenuDto) {
    return await this.menuService.createMenu(request);
  }

  @Post('/rol')
  async addMenuToRole(
    @Query('nombre_menu') nombre_menu: string,
    @Query('nombre_rol') nombre_rol: string,
  ) {
    return await this.menuService.addMenuToRole(nombre_menu, nombre_rol);
  }

  @Get('/rol/:nombre')
  async getMenusByRoleName(@Param('nombre') nombre: string) {
    return await this.menuService.getMenusByRoleName(nombre);
  }
}
