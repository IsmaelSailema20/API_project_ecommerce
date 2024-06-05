import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PersonEntity } from './person.entity';
import { RolesEntity } from 'src/roles/entities/roles.entity';
import { RolesUsuarioEntity } from 'src/roles_usuario/entities/roles_usuario.entity';

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
  @OneToMany(() => RolesUsuarioEntity, (rolesUsuario) => rolesUsuario.ID_user)
  rolesUser: RolesUsuarioEntity[];

  //RELACION CON LA TABLA DE ROLES
  @ManyToMany(() => RolesEntity, (roles) => roles.users)
  @JoinTable({
    name: 'roles_usuarios',
    joinColumn: {
      name: 'ID_user',
      referencedColumnName: 'id_usuario',
    },
    inverseJoinColumn: {
      name: 'ID_rol',
      referencedColumnName: 'id_rol',
    },
  })
  roles: UserEntity[];
}
