import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RolesUsuarioService } from './roles_usuario.service';

@ApiTags('RolesUsuarioController')
@Controller('rolesUsuario')
export class RolesUsuarioController {
  constructor(private readonly rolesUsuarioService: RolesUsuarioService) {}
  @Get()
  async getAllRolesUsers() {
    return this.rolesUsuarioService.getAllRolesUser();
  }

  @Get(':id')
  async getOneRolUser(@Param('id') id: number) {
    return this.rolesUsuarioService.getRolesUser(id);
  }
}
