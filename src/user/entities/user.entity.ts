import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PersonEntity } from './person.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id_usuario: number; // Clave primaria, no debería duplicarse

  @ManyToOne(() => PersonEntity, (person) => person.user)
  @JoinColumn({ name: 'ID_persona' })
  person: PersonEntity; // Referencia a la entidad PersonaEntity

  @Column({ type: 'varchar', length: 30, nullable: false, unique: true })
  username: string;

  @Column({ type: 'date', nullable: false })
  fecha_creacion: Date;

  @Column({ type: 'varchar', length: 100, nullable: false })
  passwordU: string;

  @Column({ type: 'varchar', length: 3, nullable: false })
  estado_usuario: string;

  @Column({ type: 'varchar', length: 3, nullable: false })
  estado_cuenta: string;

  @Column({ type: 'date', nullable: false })
  fecha_ultima_conexion: Date;
}
