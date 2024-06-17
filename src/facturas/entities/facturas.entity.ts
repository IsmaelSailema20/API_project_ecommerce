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
import { NotasDeCreditoEntity } from 'src/notas_de_credito/entities/notas_de_credito.entity';

@Entity('factura')
export class Factura {
  @PrimaryGeneratedColumn()
  id_factura: number;

  @Column({ name: 'fecha', type: 'date' })
  fecha: Date;

  @Column({ name: 'hora_factura', type: 'time' })
  hora_factura: string;

  @ManyToOne(() => UserEntity, (user) => user.factura)
  @JoinColumn({ name: 'id_user' })
  usuario: UserEntity;

  @Column({ name: 'total_factura', type: 'decimal' })
  total_factura: number;

  @Column({ name: 'porcentaje_descuento', type: 'decimal' })
  porcentaje_descuento: number;

  @OneToMany(() => DetalleFactura, (detalleFactura) => detalleFactura.factura, {
    cascade: true,
  })
  detallesFactura: DetalleFactura[];

  @ManyToOne(() => MetodosPago, (metodosPago) => metodosPago.facturas)
  @JoinColumn({ name: 'id_metodopago' })
  metodoPago: MetodosPago;

  @OneToMany(
    () => NotasDeCreditoEntity,
    (notaDeCredito) => notaDeCredito.factura,
    {
      cascade: true,
    },
  )
  notasDeCredito: NotasDeCreditoEntity[];
}
