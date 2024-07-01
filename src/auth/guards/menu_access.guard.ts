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
import { RolMenuEntity } from 'src/roles_menus/entities/rol_menu.entity';
import { Repository, In } from 'typeorm';

@Injectable()
export class MenuAccessGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @InjectRepository(MenuEntity)
    private menuRepository: Repository<MenuEntity>,
    @InjectRepository(RolMenuEntity)
    private rolMenuRepository: Repository<RolMenuEntity>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const menuName =
      this.reflector.get<string>('menu', context.getHandler()) ||
      this.reflector.get<string>('menu', context.getClass());
    if (!menuName) {
      return true; // si no hay metadato de menú, se permite acceso
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user || !user.roles) {
      throw new NotFoundException('No se encontraron roles para el usuario');
    }

    const menu = await this.menuRepository.findOne({
      where: { nombre: menuName },
    });
    if (!menu) {
      throw new NotFoundException('Menú no encontrado');
    }

    const access = await this.rolMenuRepository.findOne({
      where: {
        rol: { nombre: In(user.roles) },
        menu: { nombre: menuName },
      },
    });

    if (!access) {
      throw new UnauthorizedException('El usuario no tiene acceso a este menú');
    }

    return true; // Devuelve true si se encuentra acceso, false en caso contrario
  }
}
