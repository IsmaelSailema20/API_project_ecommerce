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
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, EditUserDto } from './dtos';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) {}
  @Get()
  async getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.usersService.getOneUser(id);
  }

  @Post()
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
