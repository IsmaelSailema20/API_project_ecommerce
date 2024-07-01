import { ProductosPromocionesEntity } from 'src/productos_promociones/entities/productos_promociones.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('promociones')
export class PromocionesEntity {
  @PrimaryGeneratedColumn()
  id_promocion: number;

  @Column({ length: 20 })
  descripcion: string;

  @Column()
  fecha_inicio: Date;

  @Column()
  fecha_fin: Date;

  @Column({ length: 4 })
  estado: string;

  @OneToMany(
    () => ProductosPromocionesEntity,
    (productoPromocion) => productoPromocion.promocion,
  )
  productoPromociones: ProductosPromocionesEntity[];
}
