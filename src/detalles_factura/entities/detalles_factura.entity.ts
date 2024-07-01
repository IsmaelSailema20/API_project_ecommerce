import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Factura } from 'src/facturas/entities/facturas.entity';
import { ProductosEntity } from 'src/productos/entities/productos.entity';

@Entity('detalle_factura')
export class DetalleFactura {
  @PrimaryGeneratedColumn()
  id_detalle_factura: number;

  @ManyToOne(() => ProductosEntity, (producto) => producto.detalleFactura, {
    cascade: true,
  })
  @JoinColumn({ name: 'id_producto' })
  producto: ProductosEntity;

  @Column({ name: 'total_detalle', type: 'decimal' })
  total_detalle: number;

  @Column({ name: 'porcentaje_descuento', type: 'decimal' })
  porcentaje_descuento: number;

  @Column({ name: 'cantidad', type: 'integer' })
  cantidad: number;

  @ManyToOne(() => Factura, (factura) => factura.detallesFactura)
  @JoinColumn({ name: 'id_factura' })
  factura: Factura;
}
