import { Module } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CategoriasController } from './categorias.controller';
import { CategoriasEntity } from './entities/categorias.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuEntity } from 'src/menus/entities/menu.entity';
import { RolMenuEntity } from 'src/roles_menus/entities/rol_menu.entity';
import { PermisoEntity } from 'src/permisos/entities/permiso.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CategoriasEntity,
      MenuEntity,
      RolMenuEntity,
      PermisoEntity,
    ]),
  ],
  providers: [CategoriasService],
  controllers: [CategoriasController],
})
export class CategoriasModule {}
