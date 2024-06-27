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
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { MenuAccessGuard } from 'src/auth/guards/menu_access.guard';
import { PermisoAccessGuard } from 'src/auth/guards/permiso_access.guard';

@ApiTags('Roles')
@ApiBearerAuth()
@Controller('roles')
@UseGuards(JwtAuthGuard, MenuAccessGuard)
@SetMetadata('menu', 'ROLES')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  @ApiOperation({ summary: 'Obtiene todos los roles' })
  @UseGuards(PermisoAccessGuard)
  @SetMetadata('permiso', 'VISUALIZAR')
  async getAllRoles() {
    return this.rolesService.getAllRoles();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtiene un rol por su ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID del rol',
  })
  @UseGuards(PermisoAccessGuard)
  @SetMetadata('permiso', 'VISUALIZAR')
  async getOneRol(@Param('id') id: number) {
    return this.rolesService.getOneRol(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crea un nuevo rol' })
  @ApiBody({ type: CreateRolfDto, description: 'Dto para crear un rol' })
  @UseGuards(PermisoAccessGuard)
  @SetMetadata('permiso', 'CREAR')
  async createRoles(@Body() createRolfDto: CreateRolfDto) {
    const newRol = await this.rolesService.createRol(createRolfDto);
    return { message: 'Rol creado exitosamente', newRol };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualiza un rol por su ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID del rol',
  })
  @ApiBody({ type: UpdateRolDto, description: 'Dto para actualizar un rol' })
  @UseGuards(PermisoAccessGuard)
  @SetMetadata('permiso', 'EDITAR')
  async updateRoles(
    @Param('id') id: number,
    @Body() updateRolDto: UpdateRolDto,
  ) {
    const updateRol = await this.rolesService.updateRol(id, updateRolDto);
    return { message: 'El rol ha sido actualizado con éxito', updateRol };
  }
}
