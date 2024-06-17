import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetalleFactura } from './entities/detalles_factura.entity';
import { DetallesFacturaService } from './detalles_factura.service';
import { DetallesFacturaController } from './detalles_factura.controller';
import { Factura } from 'src/facturas/entities/facturas.entity';
import { ProductosEntity } from 'src/productos/entities/productos.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([DetalleFactura, Factura, ProductosEntity]),
  ],
  providers: [DetallesFacturaService],
  controllers: [DetallesFacturaController],
})
export class DetallesFacturaModule {}
