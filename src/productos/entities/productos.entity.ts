import { CategoriasEntity } from 'src/categorias/entities/categorias.entity';
import { MarcasEntity } from 'src/marcas/entities/marcas.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity('productos')
export class ProductosEntity {
  @PrimaryGeneratedColumn()
  id_producto: number;

  @Column({
    name: 'nombre_producto',
    length: 50,
    type: 'varchar',
    nullable: false,
  })
  nombre: string;

  @Column({
    name: 'precio_unitario',
    type: 'decimal',
    precision: 5,
    scale: 3,
    nullable: false,
  })
  precioUnitario: number;

  @Column({
    name: 'stock',
    type: 'integer',
    nullable: false,
  })
  stock: number;

  @Column({
    name: 'estado_producto',
    type: 'varchar',
    length: 4,
    nullable: false,
  })
  estadoProducto: string;

  @Column({
    name: 'descripcion',
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  descripcion: string;

  @ManyToOne(() => MarcasEntity, (marcas) => marcas.producto, { cascade: true })
  @JoinColumn({ name: 'id_marca' })
  marca: MarcasEntity;

  @ManyToOne(() => CategoriasEntity, (categorias) => categorias.producto, {
    cascade: true,
  })
  @JoinColumn({ name: 'id_categoria' })
  categoria: CategoriasEntity;
}
