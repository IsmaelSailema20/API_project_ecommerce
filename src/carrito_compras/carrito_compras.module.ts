import { Module } from '@nestjs/common';
import { CarritoComprasService } from './carrito_compras.service';
import { CarritoComprasController } from './carrito_compras.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarritoComprasEntity } from './entities/carrito_compras.entity';
import { ProductosCarritoComprasEntity } from 'src/productos_carritos_compras/entities/productos_carrito_compras.entity';
import { UserEntity } from 'src/user/entities';
import { ProductosEntity } from 'src/productos/entities/productos.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CarritoComprasEntity,
      ProductosCarritoComprasEntity,
      UserEntity,
      ProductosEntity,
    ]),
  ],
  providers: [CarritoComprasService],
  controllers: [CarritoComprasController],
})
export class CarritoComprasModule {}
