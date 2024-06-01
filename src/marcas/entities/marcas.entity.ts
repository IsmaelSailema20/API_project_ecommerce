import { ProductosEntity } from 'src/productos/entities/productos.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
@Entity('marcas')
export class MarcasEntity {
  @PrimaryGeneratedColumn()
  id_marca: number;

  @Column({
    name: 'nombre_marca',
    type: 'varchar',
    length: 20,
    nullable: false,
  })
  nombre: string;

  @OneToMany(() => ProductosEntity, (productos) => productos.marca)
  producto: ProductosEntity[];
}
