import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TiposIdentificacionEntity } from '../../tipos-identifcadores/entities/tipos-identificacion.entity';
import { UserEntity } from './user.entity';

@Entity('persons')
export class PersonEntity {
  @PrimaryGeneratedColumn()
  id_persona: number;

  @Column({ name: 'nombre', type: 'varchar', length: 30, nullable: false })
  nombre: string;

  @Column({ name: 'apellido', type: 'varchar', length: 30, nullable: false })
  apellido: string;

  @Column({ name: 'direccion', type: 'varchar', length: 60, nullable: false })
  direccion: string;

  @Column({
    name: 'celular',
    type: 'varchar',
    length: 10,
    nullable: false,
    unique: true,
  })
  celular: string;

  @Column({
    name: 'telefono',
    type: 'varchar',
    length: 8,
    nullable: false,
    unique: true,
  })
  telefono: string;

  @Column({
    name: 'correo',
    type: 'varchar',
    length: 50,
    nullable: false,
    unique: true,
  })
  correo: string;

  @Column({ name: 'fecha_nacimiento', type: 'date', nullable: false })
  fechaNacimiento: Date;

  @Column({
    name: 'identificacion',
    type: 'varchar',
    length: 10,
    nullable: false,
    unique: true,
  })
  identificacion: string;

  @ManyToOne(() => TiposIdentificacionEntity)
  @JoinColumn({ name: 'id_tipo_identificacion' })
  tipoIdentificacion: TiposIdentificacionEntity;

  @OneToOne(() => UserEntity, (usuario) => usuario.person)
  user: UserEntity;
}
