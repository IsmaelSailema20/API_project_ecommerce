import { RolesService } from './roles.service';
import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { CreateRolfDto } from './dtos/create-rol-dto';
import { UpdateRolDto } from './dtos/update-rol.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { MenuAccessGuard } from 'src/auth/guards/menu_access.guard';
import { PermisoAccessGuard } from 'src/auth/guards/permiso_access.guard';

@ApiTags('Roles')
@Controller('roles')
@UseGuards(JwtAuthGuard, MenuAccessGuard)
@SetMetadata('menu', 'ROLES')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  @UseGuards(PermisoAccessGuard)
  @SetMetadata('permiso', 'VISUALIZAR')
  async getAllRoles() {
    return this.rolesService.getAllRoles();
  }

  @Get(':id')
  @UseGuards(PermisoAccessGuard)
  @SetMetadata('permiso', 'VISUALIZAR')
  async getOneRol(@Param('id') id: number) {
    return this.rolesService.getOneRol(id);
  }

  @Post()
  @UseGuards(PermisoAccessGuard)
  @SetMetadata('permiso', 'CREAR')
  async createRoles(@Body() createRolfDto: CreateRolfDto) {
    const newRol = await this.rolesService.createRol(createRolfDto);
    return { message: 'Rol creado exitosamente', newRol };
  }

  @Put(':id')
  @UseGuards(PermisoAccessGuard)
  @SetMetadata('permiso', 'EDITAR')
  async updateRoles(
    @Param('id') id: number,
    @Body() updateRolDto: UpdateRolDto,
  ) {
    const updateRol = await this.rolesService.updateRol(id, updateRolDto);
    return { message: 'El rol ha sido actualizado con exito', updateRol };
  }
}
