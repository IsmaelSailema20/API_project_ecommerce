import { CategoriasEntity } from 'src/categorias/entities/categorias.entity';
import { MarcasEntity } from 'src/marcas/entities/marcas.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DetalleFactura } from 'src/detalles_factura/entities/detalles_factura.entity';
import { DetalleNotasDeCreditoEntity } from 'src/detalle_notas_de_credito/entities/detalle_notas_de_credito.entity';
import { ProductosCarritoComprasEntity } from 'src/productos_carritos_compras/entities/productos_carrito_compras.entity';
import { ProductosPromocionesEntity } from 'src/productos_promociones/entities/productos_promociones.entity';
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

  @OneToMany(() => DetalleFactura, (detalleFactura) => detalleFactura.producto)
  detalleFactura: DetalleFactura[];

  @ManyToOne(() => MarcasEntity, (marcas) => marcas.producto, { cascade: true })
  @JoinColumn({ name: 'id_marca' })
  marca: MarcasEntity;

  @ManyToOne(() => CategoriasEntity, (categorias) => categorias.producto, {
    cascade: true,
  })
  @JoinColumn({ name: 'id_categoria' })
  categoria: CategoriasEntity;

  @OneToMany(
    () => DetalleNotasDeCreditoEntity,
    (detalleNotasDeCredito) => detalleNotasDeCredito.producto,
  )
  detalleNotasDeCredito: DetalleNotasDeCreditoEntity[];

  @OneToMany(
    () => ProductosCarritoComprasEntity,
    (productosCarrito) => productosCarrito.producto,
  )
  productoCarrito: ProductosCarritoComprasEntity[];

  @OneToMany(
    () => ProductosPromocionesEntity,
    (productoPromocion) => productoPromocion.producto,
  )
  productoPromociones: ProductosPromocionesEntity[];
}
