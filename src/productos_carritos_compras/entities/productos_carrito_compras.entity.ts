import { CarritoComprasEntity } from 'src/carrito_compras/entities/carrito_compras.entity';
import { ProductosEntity } from 'src/productos/entities/productos.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('productos_carrito')
export class ProductosCarritoComprasEntity {
  @PrimaryGeneratedColumn()
  id_producto_carrito: number;

  @ManyToOne(() => ProductosEntity, (producto) => producto.productoCarrito, {
    cascade: true,
  })
  @JoinColumn({ name: 'id_producto' })
  producto: ProductosEntity;

  @ManyToOne(
    () => CarritoComprasEntity,
    (carritoCompras) => carritoCompras.productosCarrito,
  )
  @JoinColumn({ name: 'id_carrito' })
  carritoCompras: CarritoComprasEntity;

  @Column({ type: 'int', nullable: false })
  cantidad: number;
}
