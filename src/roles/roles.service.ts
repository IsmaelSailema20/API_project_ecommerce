import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRolfDto } from './dtos/create-rol-dto';
import { UpdateRolDto } from './dtos/update-rol.dto';
import { RolesEntity } from './entities/roles.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(RolesEntity)
    private readonly rolesRepository: Repository<RolesEntity>,
  ) {}
  //metodo para obtener todos los roles
  async getAllRoles() {
    const roles = await this.rolesRepository.find();
    return { roles };
  }

  //metodo para obtener un rol por su id
  async getOneRol(id: number) {
    const rol = await this.rolesRepository.findOne({
      where: { id_rol: id },
    });
    if (!rol) {
      throw new NotFoundException('Rol no encontrado');
    }
    return rol;
  }

  async createRol(createRol: CreateRolfDto) {
    const rol = createRol;
    const rolExistente = await this.rolesRepository.findOne({
      where: { nombre: rol.nombre },
    });

    if (!rolExistente) {
      return await this.rolesRepository.save(rol);
    }
    throw new BadRequestException('El rol ya existe');
  }

  async updateRol(id: number, updateRolDto: UpdateRolDto) {
    const rolfind = this.getOneRol(id);

    if (!rolfind) {
      throw new NotFoundException('Rol no encontrado');
    }

    await this.rolesRepository.update(id, updateRolDto);
    return await this.getOneRol(id);
  }
}
