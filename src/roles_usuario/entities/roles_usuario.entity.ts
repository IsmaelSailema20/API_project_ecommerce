import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RolesEntity } from 'src/roles/entities/roles.entity';
import { UserEntity } from 'src/user/entities';
@Entity('roles_usuario')
export class RolesUsuarioEntity {
  @PrimaryGeneratedColumn()
  id_rol_usuario: number;

  @Column({ name: 'estado', type: 'varchar', nullable: false, length: 4 })
  estado: string;

  @ManyToOne(() => UserEntity, (user) => user.rolesUser)
  @JoinColumn({ name: 'id_usuario' })
  user: UserEntity;

  @ManyToOne(() => RolesEntity, (roles) => roles.id_rol)
  @JoinColumn({ name: 'id_rol' })
  rol: RolesEntity;
}
