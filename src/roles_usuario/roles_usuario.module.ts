import { Module } from '@nestjs/common';
import { RolesUsuarioController } from './roles_usuario.controller';
import { RolesUsuarioService } from './roles_usuario.service';
import { RolesUsuarioEntity } from './entities/roles_usuario.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuEntity } from 'src/menus/entities/menu.entity';
import { PermisoEntity } from 'src/permisos/entities/permiso.entity';
import { RolMenuEntity } from 'src/roles_menus/entities/rol_menu.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RolesUsuarioEntity,
      MenuEntity,
      RolMenuEntity,
      PermisoEntity,
    ]),
  ],
  controllers: [RolesUsuarioController],
  providers: [RolesUsuarioService],
})
export class RolesUsuarioModule {}
