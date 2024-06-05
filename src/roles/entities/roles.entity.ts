import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from 'src/user/entities';
import { RolesUsuarioEntity } from 'src/roles_usuario/entities/roles_usuario.entity';
@Entity('roles')
export class RolesEntity {
  @PrimaryGeneratedColumn()
  id_rol: number;

  @Column({
    name: 'tipo_rol',
    type: 'varchar',
    length: 20,
    unique: true,
    nullable: false,
  })
  nombre: string;

  @Column({ name: 'estado', type: 'varchar', nullable: false, length: 4 })
  estado_rol: string;

  @OneToMany(() => RolesUsuarioEntity, (rolesUsuario) => rolesUsuario.ID_roles)
  rolesUser: RolesUsuarioEntity[];

  @ManyToMany(() => UserEntity, (usuario) => usuario.roles)
  users: UserEntity[];
}
