import {
  Injectable,
  CanActivate,
  ExecutionContext,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { MenuEntity } from 'src/menus/entities/menu.entity';
import { PermisoEntity } from 'src/permisos/entities/permiso.entity';
import { RolMenuEntity } from 'src/roles_menus/entities/rol_menu.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class PermisoAccessGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @InjectRepository(MenuEntity)
    private menuRepository: Repository<MenuEntity>,
    @InjectRepository(RolMenuEntity)
    private rolMenuRepository: Repository<RolMenuEntity>,
    @InjectRepository(PermisoEntity)
    private permisoRepository: Repository<PermisoEntity>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const permisoName =
      this.reflector.get<string>('permiso', context.getHandler()) ||
      this.reflector.get<string>('permiso', context.getClass());
    if (!permisoName) {
      return true; // si no hay metadato de menú, se permite acceso
    }

    const menuName =
      this.reflector.get<string>('menu', context.getHandler()) ||
      this.reflector.get<string>('menu', context.getClass());

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user || !user.roles) {
      throw new NotFoundException('No se encontraron roles para el usuario');
    }

    const permiso = await this.permisoRepository.findOne({
      where: { nombre: permisoName },
    });
    if (!permiso) {
      throw new NotFoundException('Permiso no encontrado');
    }

    const access = await this.rolMenuRepository.findOne({
      where: {
        rol: { nombre: In(user.roles) },
        menu: { nombre: menuName },
        roles_menus_permisos: {
          permiso: { nombre: permisoName },
          estado: 'ACT',
        },
      },
      relations: ['roles_menus_permisos', 'roles_menus_permisos.permiso'],
    });

    if (!access) {
      throw new UnauthorizedException(
        'El usuario no tiene acceso a este permiso',
      );
    }

    return true; // Devuelve true si se encuentra acceso, false en caso contrario
  }
}
