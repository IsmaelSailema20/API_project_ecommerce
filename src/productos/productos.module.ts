import { Module } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { ProductosController } from './productos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductosEntity } from './entities/productos.entity';
import { MarcasEntity } from 'src/marcas/entities/marcas.entity';
import { CategoriasEntity } from 'src/categorias/entities/categorias.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductosEntity, MarcasEntity, CategoriasEntity]),
  ],
  providers: [ProductosService],
  controllers: [ProductosController],
})
export class ProductosModule {}
