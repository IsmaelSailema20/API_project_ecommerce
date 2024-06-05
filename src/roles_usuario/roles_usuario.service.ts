import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateRolesUsuario } from './dtos/create-roles-usuario.dtos';
import { RolesUsuarioEntity } from './entities/roles_usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RolesUsuarioService {
  constructor(
    @InjectRepository(RolesUsuarioEntity)
    private readonly rolesUserRepository: Repository<RolesUsuarioEntity>,
  ) {}

  async getAllRolesUser() {
    return await this.rolesUserRepository.find();
  }

  async getRolesUser(id: number) {
    const rolesUser = await this.rolesUserRepository.findOne({
      where: { id },
      relations: ['RolesUsuarioEntity'],
    });
    if (!rolesUser) {
      throw new NotFoundException('No se encontraron los roles del usuario');
    }
    return rolesUser;
  }
}
