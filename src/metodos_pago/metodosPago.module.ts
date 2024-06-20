import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetodosPago } from './entities/metodosPago.entity';
import { MetodosPagoService } from './metodosPago.service';
import { MetodosPagoController } from './metodosPago.controller';
import { UserEntity } from 'src/user/entities/user.entity';
import { MenuEntity } from 'src/menus/entities/menu.entity';
import { PermisoEntity } from 'src/permisos/entities/permiso.entity';
import { RolMenuEntity } from 'src/roles_menus/entities/rol_menu.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MetodosPago,
      UserEntity,
      MenuEntity,
      RolMenuEntity,
      PermisoEntity,
    ]),
  ],
  providers: [MetodosPagoService],
  controllers: [MetodosPagoController],
})
export class MetodosPagoModule {}
