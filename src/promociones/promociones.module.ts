import { Module } from '@nestjs/common';
import { PromocionesService } from './promociones.service';
import { PromocionesController } from './promociones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PromocionesEntity } from './entities/promociones.entity';
import { MenuEntity } from 'src/menus/entities/menu.entity';
import { PermisoEntity } from 'src/permisos/entities/permiso.entity';
import { RolMenuEntity } from 'src/roles_menus/entities/rol_menu.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PromocionesEntity,
      MenuEntity,
      RolMenuEntity,
      PermisoEntity,
    ]),
  ],
  providers: [PromocionesService],
  controllers: [PromocionesController],
})
export class PromocionesModule {}
