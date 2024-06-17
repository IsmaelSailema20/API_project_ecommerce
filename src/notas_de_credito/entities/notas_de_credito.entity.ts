import { DetalleNotasDeCreditoEntity } from 'src/detalle_notas_de_credito/entities/detalle_notas_de_credito.entity';
//import { UserEntity } from 'src/user/entities';
import {
  Column,
  Entity,
  //JoinColumn,
  //ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('nota_de_credito')
export class NotasDeCreditoEntity {
  @PrimaryGeneratedColumn()
  id_nota_credito: number;

  @Column({ type: 'date', nullable: false })
  fecha: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  monto: number;

  @Column({ type: 'text', nullable: true })
  descripcion: string;
  /*
  @ManyToOne(() => Factura, (factura) => factura.)
  @JoinColumn({ name: 'id_factura' })
  factura: Factura;

  @ManyToOne(() => UserEntity, (user) => user.nota_de_credito)
  @JoinColumn({ name: 'id_usuario' })
  usuario: UserEntity;
*/
  @OneToMany(
    () => DetalleNotasDeCreditoEntity,
    (detalleNotaDeCredito) => detalleNotaDeCredito.notaDeCredito,
  )
  detallesNotaDeCredito: DetalleNotasDeCreditoEntity[];
}
