import { Module } from '@nestjs/common';
import { TiposIdentifcadoresController } from './tipos-identifcadores.controller';
import { TiposIdentifcadoresService } from './tipos-identifcadores.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TiposIdentificacionEntity } from 'src/tipos-identifcadores/entities/tipos-identificacion.entity';
import { MenuEntity } from 'src/menus/entities/menu.entity';
import { RolMenuEntity } from 'src/roles_menus/entities/rol_menu.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TiposIdentificacionEntity,
      MenuEntity,
      RolMenuEntity,
    ]),
  ],
  controllers: [TiposIdentifcadoresController],
  providers: [TiposIdentifcadoresService],
})
export class TiposIdentifcadoresModule {}
