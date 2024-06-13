import { Module } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { ProductosController } from './productos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductosEntity } from './entities/productos.entity';
import { MarcasEntity } from 'src/marcas/entities/marcas.entity';
import { CategoriasEntity } from 'src/categorias/entities/categorias.entity';
import { RolMenuEntity } from 'src/roles_menus/entities/rol_menu.entity';
import { MenuEntity } from 'src/menus/entities/menu.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductosEntity,
      MarcasEntity,
      CategoriasEntity,
      MenuEntity,
      RolMenuEntity,
    ]),
  ],
  providers: [ProductosService],
  controllers: [ProductosController],
})
export class ProductosModule {}
