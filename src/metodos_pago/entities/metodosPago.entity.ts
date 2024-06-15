import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { Factura } from 'src/facturas/entities/facturas.entity';
import { UserEntity } from 'src/user/entities';

@Entity()
export class MetodosPago {
  @PrimaryGeneratedColumn()
  id_metodoPago: number;

  @Column()
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
