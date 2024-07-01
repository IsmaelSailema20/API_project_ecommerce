import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRolfDto } from './dtos/create-rol-dto';
import { UpdateRolDto } from './dtos/update-rol.dto';
import { RolesEntity } from './entities/roles.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/user/entities';
import { RolesUsuarioEntity } from 'src/roles_usuario/entities/roles_usuario.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(RolesEntity)
    private readonly rolesRepository: Repository<RolesEntity>,
    @InjectRepository(UserEntity)
    private readonly usuarioRepository: Repository<UserEntity>,
    @InjectRepository(RolesUsuarioEntity)
    private readonly rolUsuarioRepository: Repository<RolesUsuarioEntity>,
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

  async addRolToUser(username: string, nombreRol: string) {
    const user = await this.usuarioRepository.findOne({
      where: { username },
    });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const rol = await this.rolesRepository.findOne({
      where: { nombre: nombreRol },
    });

    if (!rol) {
      throw new NotFoundException('Rol no encontrado');
    }

    const rolUsuario = await this.usuarioRepository.findOne({
      where: { rolesUser: { rol, user } },
    });

    if (rolUsuario) {
      throw new ConflictException('El usuario ya tiene ese rol');
    }

    const rolU = new RolesUsuarioEntity();
    rolU.rol = rol;
    rolU.user = user;
    rolU.estado = 'ACT';

    await this.rolUsuarioRepository.save(rolU);
  }
}
