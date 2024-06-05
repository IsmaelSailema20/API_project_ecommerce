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

  @Column({ name: 'estado', type: 'number', nullable: false, length: 4 })
  estado: string;

  @ManyToOne(() => UserEntity, (user) => user.roles)
  @JoinColumn({ name: 'ID_user' })
  ID_user: UserEntity;

  @ManyToOne(() => RolesEntity, (roles) => roles.id_rol)
  @JoinColumn({ name: 'ID_roles' })
  ID_roles: RolesEntity;
}
