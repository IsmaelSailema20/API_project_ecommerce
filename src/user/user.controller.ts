import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { CreateUserDto } from './dtos/create-user.dto';
import { EditUserDto } from './dtos/edite-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { MenuAccessGuard } from 'src/auth/guards/menu_access.guard';
import { PermisoAccessGuard } from 'src/auth/guards/permiso_access.guard';

@ApiTags('Usuarios')
@ApiBearerAuth()
@Controller('users')
@UseGuards(JwtAuthGuard, MenuAccessGuard)
@SetMetadata('menu', 'USUARIOS')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Obtiene todos los usuarios' })
  @UseGuards(PermisoAccessGuard)
  @SetMetadata('permiso', 'VISUALIZAR')
  async getAll() {
    return this.usersService.getAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtiene un usuario por su ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID del usuario',
  })
  @UseGuards(PermisoAccessGuard)
  @SetMetadata('permiso', 'VISUALIZAR')
  async getById(@Param('id') id: number) {
    return this.usersService.getById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crea un nuevo usuario' })
  @ApiBody({ type: CreateUserDto, description: 'Dto para crear un usuario' })
  @UseGuards(PermisoAccessGuard)
  @SetMetadata('permiso', 'CREAR')
  async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      const newUser = await this.usersService.createUser(createUserDto);
      return { message: 'Usuario creado', newUser };
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof ConflictException
      ) {
        throw error;
      }
      throw new BadRequestException('Ocurrió un error al crear el usuario');
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualiza un usuario por su ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID del usuario',
  })
  @ApiBody({ type: EditUserDto, description: 'Dto para actualizar un usuario' })
  @UseGuards(PermisoAccessGuard)
  @SetMetadata('permiso', 'EDITAR')
  async update(@Param('id') id: number, @Body() updateUserDto: EditUserDto) {
    try {
      const updateUser = await this.usersService.updateUser(id, updateUserDto);
      return { message: 'Usuario actualizado', updateUser };
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof ConflictException
      ) {
        throw error;
      }
      throw new BadRequestException(
        'Ocurrió un error al actualizar el usuario.',
      );
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Elimina un usuario por su ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID del usuario',
  })
  @UseGuards(PermisoAccessGuard)
  @SetMetadata('permiso', 'ELIMINAR')
  async remove(@Param('id') id: number) {
    try {
      const userDelete = this.usersService.deleteUser(id);
      return { message: 'Usuario eliminado', userDelete };
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof ConflictException
      ) {
        throw error;
      }
      throw new BadRequestException('Ocurrió un error al eliminar el usuario.');
    }
  }
}
