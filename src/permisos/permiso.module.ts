import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermisoEntity } from 'src/permisos/entities/permiso.entity';
import { RolMenuPermisoEntity } from 'src/roles_menus_permisos/entities/roles_menus_permisos.entity';
import { PermisoService } from './permiso.service';
import { PermisoController } from './permiso.controller';
import { RolesEntity } from 'src/roles/entities/roles.entity';
import { MenuEntity } from 'src/menus/entities/menu.entity';
import { RolMenuEntity } from 'src/roles_menus/entities/rol_menu.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PermisoEntity,
      RolMenuPermisoEntity,
      RolesEntity,
      MenuEntity,
      RolMenuEntity,
    ]),
  ],
  controllers: [PermisoController],
  providers: [PermisoService],
})
export class PermisoModule {}
