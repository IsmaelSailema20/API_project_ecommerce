import { ProductosCarritoComprasEntity } from 'src/productos_carritos_compras/entities/productos_carrito_compras.entity';
import { UserEntity } from 'src/user/entities';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('carrito_compras')
export class CarritoComprasEntity {
  @PrimaryGeneratedColumn()
  id_carrito: number;

  @OneToOne(() => UserEntity)
  @JoinColumn({ name: 'id_usuario' })
  usuario: UserEntity;

  @Column({ type: 'varchar', length: 4, nullable: false })
  estado: string;

  @OneToMany(
    () => ProductosCarritoComprasEntity,
    (productosCarrito) => productosCarrito.carritoCompras,
  )
  productosCarrito: ProductosCarritoComprasEntity[];
}
