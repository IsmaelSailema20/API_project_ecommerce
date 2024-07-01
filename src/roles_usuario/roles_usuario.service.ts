import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { RolesUsuarioEntity } from './entities/roles_usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RolesUsuarioService {
  constructor(
    @InjectRepository(RolesUsuarioEntity)
    private readonly rolesUserRepository: Repository<RolesUsuarioEntity>,
  ) {}

  async getAllRolesUser() {
    return await this.rolesUserRepository.find({
      relations: ['ID_usuario', 'ID_rol'],
    });
  }

  async getRolesUser(id: number) {
    const rolesUser = await this.rolesUserRepository.findOne({
      where: { id_rol_usuario: id },
      relations: ['ID_usuario', 'ID_rol'],
    });
    if (!rolesUser) {
      throw new NotFoundException('No se encontraron los roles del usuario');
    }
    return rolesUser;
  }
}
