import { RolesService } from './roles.service';
import { Controller, Get, Param, Post, Body, Put } from '@nestjs/common';
import { CreateRolfDto } from './dtos/create-rol-dto';
import { UpdateRolDto } from './dtos/update-rol.dto';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  async getAllRoles() {
    return this.rolesService.getAllRoles();
  }
  @Get(':id')
  async getOneRol(@Param('id') id: number) {
    return this.rolesService.getOneRol(id);
  }
  @Post()
  async createRoles(@Body() createRolfDto: CreateRolfDto) {
    const newRol = await this.rolesService.createRol(createRolfDto);
    return { message: 'Rol creado exitosamente', newRol };
  }
  @Put(':id')
  async updateRoles(
    @Param('id') id: number,
    @Body() updateRolDto: UpdateRolDto,
  ) {
    const updateRol = await this.rolesService.updateRol(id, updateRolDto);
    return { message: 'El rol ha sido actualizado con exito', updateRol };
  }
}
