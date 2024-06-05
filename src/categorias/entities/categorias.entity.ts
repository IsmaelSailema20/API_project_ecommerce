import { ProductosEntity } from 'src/productos/entities/productos.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
@Entity('categorias')
export class CategoriasEntity {
  @PrimaryGeneratedColumn()
  id_categoria: number;

  @Column({
    name: 'nombre_categoria',
    type: 'varchar',
    length: 20,
    nullable: false,
  })
  nombre: string;

  @OneToMany(() => ProductosEntity, (productos) => productos.categoria)
  producto: ProductosEntity[];
}
