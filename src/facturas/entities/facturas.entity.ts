import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from 'src/user/entities';
import { DetalleFactura } from 'src/detalles_factura/entities/detalles_factura.entity';
import { MetodosPago } from 'src/metodos_pago/entities/metodosPago.entity';

@Entity()
export class Factura {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  fecha: Date;

  @Column({ type: 'time' })
  hora_factura: string;

  @ManyToOne(() => UserEntity, (user) => user.factura)
  @JoinColumn({ name: 'id_user' })
  usuario: UserEntity;

  @Column({ type: 'decimal' })
  total_factura: number;

  @Column({ type: 'decimal' })
  porcentaje_descuento: number;

  @OneToMany(() => DetalleFactura, (detalleFactura) => detalleFactura.factura, {
    cascade: true,
  })
  detallesFactura: DetalleFactura[];

  @ManyToOne(() => MetodosPago, (metodosPago) => metodosPago.facturas)
  @JoinColumn({ name: 'id_metodoPago' })
  metodoPago: MetodosPago;
}
