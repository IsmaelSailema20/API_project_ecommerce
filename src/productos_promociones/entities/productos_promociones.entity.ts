import { ProductosEntity } from 'src/productos/entities/productos.entity';
import { PromocionesEntity } from 'src/promociones/entities/promociones.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('productos_promociones')
export class ProductosPromocionesEntity {
  @PrimaryGeneratedColumn()
  id_producto_promocion: number;

  @Column()
  id_producto: number;

  @Column()
  id_promocion: number;

  @ManyToOne(() => ProductosEntity, (producto) => producto.productoPromociones)
  @JoinColumn({ name: 'id_producto' })
  producto: ProductosEntity;

  @ManyToOne(
    () => PromocionesEntity,
    (promocion) => promocion.productoPromociones,
  )
  @JoinColumn({ name: 'id_promocion' })
  promocion: PromocionesEntity;
}
