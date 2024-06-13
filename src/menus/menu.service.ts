import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { MenuEntity } from './entities/menu.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RolesEntity } from 'src/roles/entities/roles.entity';
import { RolMenuEntity } from 'src/roles_menus/entities/rol_menu.entity';
import { CreateMenuDto } from './dtos/menu.dto';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(MenuEntity)
    private readonly menuRepository: Repository<MenuEntity>,
    @InjectRepository(RolesEntity)
    private readonly rolRepository: Repository<RolesEntity>,
    @InjectRepository(RolMenuEntity)
    private readonly rolMenuRepository: Repository<RolMenuEntity>,
  ) {}

  async getAll() {
    const menus = await this.menuRepository.find();

    if (menus.length == 0) {
      throw new NotFoundException('No existen menús');
    }

    return menus;
  }

  async createMenu(menuDto: CreateMenuDto) {
    const menu = await this.menuRepository.findOneBy({
      nombre: menuDto.nombre,
    });

    if (menu) {
      throw new ConflictException('El menú ya existe');
    }

    return await this.menuRepository.save(menuDto);
  }

  async addMenuToRole(nombre_menu: string, nombre_rol: string): Promise<void> {
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

    // Verificar si el rol ya tiene el menú
    const rolMenuExists = await this.rolMenuRepository.findOne({
      where: {
        rol: { id_rol: rol.id_rol },
        menu: { id_menu: menu.id_menu },
      },
    });
    if (rolMenuExists) {
      throw new ConflictException('El rol ya tiene el menú');
    }

    const rolMenu = new RolMenuEntity();
    rolMenu.menu = menu;
    rolMenu.rol = rol;

    await this.rolMenuRepository.save(rolMenu);
  }

  async getMenusByRoleName(nombre: string) {
    const rol = await this.rolRepository.findOne({
      where: { nombre },
    });

    if (!rol) {
      throw new NotFoundException('No existe el rol');
    }

    const menus = await this.menuRepository.find({
      where: { roles_menus: { rol } },
    });

    if (menus.length == 0) {
      throw new NotFoundException('El rol no tiene menús');
    }

    return { rol: rol.nombre, menus: menus };
  }
}
