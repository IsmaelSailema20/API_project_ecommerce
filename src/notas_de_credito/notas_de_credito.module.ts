import { Module } from '@nestjs/common';
import { NotasDeCreditoService } from './notas_de_credito.service';
import { NotasDeCreditoController } from './notas_de_credito.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Factura } from 'src/facturas/entities/facturas.entity';
import { UserEntity } from 'src/user/entities';
import { ProductosEntity } from 'src/productos/entities/productos.entity';
import { DetalleNotasDeCreditoEntity } from 'src/detalle_notas_de_credito/entities/detalle_notas_de_credito.entity';
import { NotasDeCreditoEntity } from './entities/notas_de_credito.entity';
import { MenuEntity } from 'src/menus/entities/menu.entity';
import { PermisoEntity } from 'src/permisos/entities/permiso.entity';
import { RolMenuEntity } from 'src/roles_menus/entities/rol_menu.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Factura,
      UserEntity,
      ProductosEntity,
      DetalleNotasDeCreditoEntity,
      NotasDeCreditoEntity,
      MenuEntity,
      RolMenuEntity,
      PermisoEntity,
    ]),
  ],
  providers: [NotasDeCreditoService],
  controllers: [NotasDeCreditoController],
})
export class NotasDeCreditoModule {}
