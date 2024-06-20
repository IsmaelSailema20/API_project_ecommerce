import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
  ): Promise<string> {
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

    const rol_menu_permisoExists = await this.rolMenuPermisoRepository.findOne({
      where: { rol_menu, permiso },
    });

    if (rol_menu_permisoExists) {
      if (rol_menu_permisoExists.estado === 'ACT') {
        return `El permiso ${nombre_permiso} con menú ${nombre_menu} del rol ${nombre_rol} ya existe`;
      } else if (rol_menu_permisoExists.estado === 'DES') {
        rol_menu_permisoExists.estado = 'ACT';
        await this.rolMenuPermisoRepository.save(rol_menu_permisoExists);
        return `El permiso ${nombre_permiso} con menú ${nombre_menu} del rol ${nombre_rol} paso a activo`;
      }
    }

    const rol_menu_permiso = new CreateRolMenuPermiso();
    rol_menu_permiso.permiso = permiso;
    rol_menu_permiso.rol_menu = rol_menu;
    rol_menu_permiso.estado = 'ACT';

    await this.rolMenuPermisoRepository.save(rol_menu_permiso);

    return `Se agrego el permiso ${nombre_permiso} al menú ${nombre_menu} del rol ${nombre_rol}`;
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

    if (menus.length == 0) {
      throw new NotFoundException('El rol no tiene menus');
    }

    const resultado = menus.map((menu) => {
      return {
        id_menu: menu.id_menu,
        nombre: menu.nombre,
        permisos: menu.roles_menus.flatMap((rol_menu) =>
          rol_menu.roles_menus_permisos.map((rmp) => ({
            nombre: rmp.permiso.nombre,
            estado: rmp.estado,
          })),
        ),
      };
    });

    const rolOutput = {
      id_rol: rol.id_rol,
      nombre: rol.nombre,
      menus: resultado,
    };

    return { rol: rolOutput };
  }

  async cambiarEstadoPermiso(
    estado: string,
    nombre_menu: string,
    nombre_rol: string,
    nombre_permiso: string,
  ): Promise<string> {
    if (estado !== 'ACT' && estado !== 'DES') {
      throw new ConflictException(
        'El estado debe ser "ACT" para activo y "DES" para desactivo',
      );
    }

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

    const rol_menu_permisoExists = await this.rolMenuPermisoRepository.findOne({
      where: { rol_menu, permiso },
    });

    if (rol_menu_permisoExists) {
      rol_menu_permisoExists.estado = estado;
      await this.rolMenuPermisoRepository.save(rol_menu_permisoExists);
      return `El permiso ${nombre_permiso} con menú ${nombre_menu} del rol ${nombre_rol} cambio de estado`;
    }
    return `El permiso ${nombre_permiso} con menú ${nombre_menu} del rol ${nombre_rol} no existe`;
  }
}
