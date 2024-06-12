import { Controller, Get } from '@nestjs/common';
import { MenuService } from './menu.service';

@Controller('menu')
export class MenuController {
  constructor(private readonly menusService: MenuService) {}

  @Get()
  async getAll() {
    return await this.menusService.getAll();
  }
}
