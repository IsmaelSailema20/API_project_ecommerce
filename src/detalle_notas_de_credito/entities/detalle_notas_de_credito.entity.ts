import { NotasDeCreditoEntity } from 'src/notas_de_credito/entities/notas_de_credito.entity';
import { ProductosEntity } from 'src/productos/entities/productos.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('detalle_nota_de_credito')
export class DetalleNotasDeCreditoEntity {
  @PrimaryGeneratedColumn()
  id_detalle_nota_credito: number;

  @ManyToOne(
    () => NotasDeCreditoEntity,
    (notaDeCredito) => notaDeCredito.detallesNotaDeCredito,
  )
  @JoinColumn({ name: 'id_nota_credito' })
  notaDeCredito: NotasDeCreditoEntity;

  @ManyToOne(
    () => ProductosEntity,
    (producto) => producto.detalleNotasDeCredito,
    {
      cascade: true,
    },
  )
  @JoinColumn({ name: 'id_producto' })
  producto: ProductosEntity;

  @Column({ type: 'int', nullable: false })
  cantidad: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  total_detalle: number;
}
