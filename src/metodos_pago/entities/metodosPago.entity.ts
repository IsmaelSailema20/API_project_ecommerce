import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { Factura } from 'src/facturas/entities/facturas.entity';
import { UserEntity } from 'src/user/entities';

@Entity('metodos_pago')
export class MetodosPago {
  @PrimaryGeneratedColumn()
  id_metodo_pago: number;

  @Column({ type: 'varchar', length: 255 })
  nombre: string;

  @Column()
  descripcion: string;

  @Column({ type: 'varchar', length: 4 })
  estado: string;

  @OneToMany(() => Factura, (factura) => factura.metodoPago)
  facturas: Factura[];

  @ManyToMany(() => UserEntity, (user) => user.metodosPago)
  usuarios: UserEntity[];
}
