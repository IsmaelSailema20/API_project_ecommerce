import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Factura } from 'src/facturas/entities/facturas.entity';
import { ProductosEntity } from 'src/productos/entities/productos.entity';

@Entity()
export class DetalleFactura {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ProductosEntity, (producto) => producto.detalleFactura)
  @JoinColumn({ name: 'id_producto' })
  producto: ProductosEntity;

  @Column({ type: 'decimal' })
  total_detalle: number;

  @Column({ type: 'decimal' })
  porcentaje_descuento: number;

  @Column({ type: 'number' })
  cantidad: number;

  @ManyToOne(() => Factura, (factura) => factura.detallesFactura)
  factura: Factura[];
}
