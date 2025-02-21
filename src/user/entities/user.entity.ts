import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  ManyToMany,
  PrimaryGeneratedColumn,
  JoinTable,
} from 'typeorm';
import { PersonEntity } from './person.entity';
import { RolesUsuarioEntity } from 'src/roles_usuario/entities/roles_usuario.entity';
import { Factura } from 'src/facturas/entities/facturas.entity';
import { MetodosPago } from 'src/metodos_pago/entities/metodosPago.entity';
import { NotasDeCreditoEntity } from 'src/notas_de_credito/entities/notas_de_credito.entity';
import { CarritoComprasEntity } from 'src/carrito_compras/entities/carrito_compras.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id_usuario: number; // Clave primaria, no debería duplicarse

  @Column({ type: 'varchar', length: 30, nullable: false, unique: true })
  username: string;

  @Column({ type: 'date', nullable: false })
  fecha_creacion: Date;

  @Column({ type: 'varchar', length: 100, nullable: false })
  password: string;

  @Column({ type: 'varchar', length: 3, nullable: false })
  estado_usuario: string;

  @Column({ type: 'varchar', length: 3, nullable: false })
  estado_cuenta: string;

  @Column({ type: 'date', nullable: false })
  fecha_ultima_conexion: Date;

  //RELACION CON LA TABLA DE PERSONAS
  @OneToOne(() => PersonEntity, (person) => person.user, { cascade: true })
  @JoinColumn({ name: 'id_persona' })
  person: PersonEntity;

  //RELACION CON LA TABLA DE ROLES_USUARIOS
  @OneToMany(() => RolesUsuarioEntity, (rolesUsuario) => rolesUsuario.user)
  rolesUser: RolesUsuarioEntity[];

  //RELACION CON FACTURAS
  @OneToMany(() => Factura, (factura) => factura.usuario, { cascade: true })
  factura: Factura;

  // RELACION MUCHOS A MUCHOS CON METODOS DE PAGO
  @ManyToMany(() => MetodosPago, (metodoPago) => metodoPago.usuarios)
  @JoinTable({
    name: 'users_metodos_pago',
    joinColumn: { name: 'id_user', referencedColumnName: 'id_usuario' },
    inverseJoinColumn: {
      name: 'id_metodo_pago',
      referencedColumnName: 'id_metodo_pago',
    },
  })
  metodosPago: MetodosPago[];

  @OneToMany(
    () => NotasDeCreditoEntity,
    (notaDeCredito) => notaDeCredito.usuario,
    {
      cascade: true,
    },
  )
  notasDeCredito: NotasDeCreditoEntity[];

  @OneToOne(() => CarritoComprasEntity, (carrito) => carrito.usuario, {
    cascade: true,
  })
  carrito: CarritoComprasEntity;
}
