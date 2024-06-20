import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesEntity } from './entities/roles.entity';
import { RolMenuEntity } from 'src/roles_menus/entities/rol_menu.entity';
import { MenuEntity } from 'src/menus/entities/menu.entity';
import { PermisoEntity } from 'src/permisos/entities/permiso.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RolesEntity,
      MenuEntity,
      RolMenuEntity,
      PermisoEntity,
    ]),
  ],
  providers: [RolesService],
  controllers: [RolesController],
})
export class RolesModule {}
