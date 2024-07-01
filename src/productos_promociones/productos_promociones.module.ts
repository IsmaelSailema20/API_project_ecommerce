import { Module } from '@nestjs/common';
import { ProductosPromocionesService } from './productos_promociones.service';
import { ProductosPromocionesController } from './productos_promociones.controller';

@Module({
  providers: [ProductosPromocionesService],
  controllers: [ProductosPromocionesController]
})
export class ProductosPromocionesModule {}
