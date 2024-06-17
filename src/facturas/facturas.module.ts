import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Factura } from './entities/facturas.entity';
import { FacturasService } from './facturas.service';
import { FacturasController } from './facturas.controller';
import { UserEntity } from 'src/user/entities/user.entity';
import { DetalleFactura } from 'src/detalles_factura/entities/detalles_factura.entity';
import { MetodosPago } from 'src/metodos_pago/entities/metodosPago.entity';
import { ProductosEntity } from 'src/productos/entities/productos.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Factura,
      UserEntity,
      DetalleFactura,
      MetodosPago,
      ProductosEntity,
    ]),
  ],
  providers: [FacturasService],
  controllers: [FacturasController],
})
export class FacturasModule {}
