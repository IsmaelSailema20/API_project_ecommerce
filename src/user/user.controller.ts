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
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dtos/create-user.dto';
import { EditUserDto } from './dtos/edite-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { MenuAccessGuard } from 'src/auth/guards/menu_access.guard';
import { PermisoAccessGuard } from 'src/auth/guards/permiso_access.guard';

@ApiTags('Usuarios')
@Controller('users')
@UseGuards(JwtAuthGuard, MenuAccessGuard)
@SetMetadata('menu', 'USUARIOS')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Get()
  @UseGuards(PermisoAccessGuard)
  @SetMetadata('permiso', 'VISUALIZAR')
  async getAll() {
    return this.usersService.getAll();
  }

  @Get(':id')
  @UseGuards(PermisoAccessGuard)
  @SetMetadata('permiso', 'VISUALIZAR')
  async getById(@Param('id') id: number) {
    return this.usersService.getById(id);
  }

  @Post()
  @UseGuards(PermisoAccessGuard)
  @SetMetadata('permiso', 'CREAR')
  async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      const newUser = await this.usersService.createUser(createUserDto);
      return { message: 'Usuario Creado', newUser };
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
  @UseGuards(PermisoAccessGuard)
  @SetMetadata('permiso', 'EDITAR')
  async update(@Param('id') id: number, @Body() updateUserDto: EditUserDto) {
    try {
      const updateUser = await this.usersService.updateUser(id, updateUserDto);
      return { message: 'Usuario Actualizado', updateUser };
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
  @UseGuards(PermisoAccessGuard)
  @SetMetadata('permiso', 'ELIMINAR')
  async remove(@Param('id') id: number) {
    try {
      const userDelete = this.usersService.deleteUser(id);
      return { message: 'Usuario Eliminado', userDelete };
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
}
