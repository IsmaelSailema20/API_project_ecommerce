import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PermisoEntity } from 'src/permisos/entities/permiso.entity';
import { RolMenuPermisoEntity } from 'src/roles_menus_permisos/entities/roles_menus_permisos.entity';
import { UpdatePermisoDto } from './dtos/update-permiso.dto';
import { CreatePermisoDto } from './dtos/create-permiso.dto';
import { MenuEntity } from 'src/menus/entities/menu.entity';
import { RolesEntity } from 'src/roles/entities/roles.entity';
import { RolMenuEntity } from 'src/roles_menus/entities/rol_menu.entity';
import { CreateRolMenuPermiso } from 'src/roles_menus_permisos/dtos/roles_menus_permisos.dto';

@Injectable()
export class PermisoService {
  constructor(
    @InjectRepository(PermisoEntity)
    private permisoRepository: Repository<PermisoEntity>,
    @InjectRepository(RolMenuPermisoEntity)
    private rolMenuPermisoRepository: Repository<RolMenuPermisoEntity>,
    @InjectRepository(MenuEntity)
    private readonly menuRepository: Repository<MenuEntity>,
    @InjectRepository(RolesEntity)
    private readonly rolRepository: Repository<RolesEntity>,
    @InjectRepository(RolMenuEntity)
    private readonly rolMenuRepository: Repository<RolMenuEntity>,
  ) {}

  async findAll(): Promise<PermisoEntity[]> {
    return this.permisoRepository.find();
  }

  async findOne(id_permiso: number): Promise<PermisoEntity> {
    const permiso = await this.permisoRepository.findOne({
      where: { id_permiso },
    });
    if (!permiso) {
      throw new NotFoundException(
        `Permiso con id: ${id_permiso} no encontrado`,
      );
    }
    return permiso;
  }

  async create(createPermisoDto: CreatePermisoDto): Promise<PermisoEntity> {
    const permiso = this.permisoRepository.create(createPermisoDto);
    return this.permisoRepository.save(permiso);
  }

  async update(
    id: number,
    updatePermisoDto: UpdatePermisoDto,
  ): Promise<PermisoEntity> {
    const permiso = await this.findOne(id);
    Object.assign(permiso, updatePermisoDto);
    return this.permisoRepository.save(permiso);
  }

  async remove(id: number): Promise<void> {
    const permiso = await this.findOne(id);
    await this.permisoRepository.remove(permiso);
  }

  async addPermisoToRolMenu(
    nombre_menu: string,
    nombre_rol: string,
    nombre_permiso: string,
  ): Promise<void> {
    // Buscar el menú por nombre
    const menu = await this.menuRepository.findOne({
      where: { nombre: nombre_menu },
    });
    if (!menu) {
      throw new NotFoundException('El menú no existe');
    }

    // Buscar el rol por nombre
    const rol = await this.rolRepository.findOne({
      where: { nombre: nombre_rol },
    });
    if (!rol) {
      throw new NotFoundException('El rol no existe');
    }

    const permiso = await this.permisoRepository.findOne({
      where: { nombre: nombre_permiso },
    });
    if (!permiso) {
      throw new NotFoundException('El permiso no existe');
    }

    const rol_menu = await this.rolMenuRepository.findOne({
      where: { rol, menu },
    });

    if (!rol_menu) {
      throw new NotFoundException('La relacion del rol y menu no existe');
    }

    const rol_menu_permiso = new CreateRolMenuPermiso();
    rol_menu_permiso.permiso = permiso;
    rol_menu_permiso.rol_menu = rol_menu;

    await this.rolMenuPermisoRepository.save(rol_menu_permiso);
  }

  async getMenusPermisosByRol(nombre: string) {
    const rol = await this.rolRepository.findOne({
      where: { nombre },
    });

    if (!rol) {
      throw new NotFoundException('No existe el rol');
    }

    const menus = await this.menuRepository.find({
      where: { roles_menus: { rol } },
      relations: [
        'roles_menus',
        'roles_menus.roles_menus_permisos',
        'roles_menus.roles_menus_permisos.permiso',
      ],
    });

    // const rol_menu_permiso = await this.rolMenuPermisoRepository.find({
    //   where: { rol_menu: { rol } },
    // });

    if (menus.length == 0) {
      throw new NotFoundException('El rol no tiene menus');
    }

    return { rol: rol.nombre, menus: menus };
  }
}
