import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RolesUsuarioEntity } from 'src/roles_usuario/entities/roles_usuario.entity';
import { RolMenuEntity } from 'src/roles_menus/entities/rol_menu.entity';
@Entity('roles')
export class RolesEntity {
  @PrimaryGeneratedColumn()
  id_rol: number;

  @Column({
    type: 'varchar',
    length: 20,
    unique: true,
    nullable: false,
  })
  nombre: string;

  @Column({ name: 'estado', type: 'varchar', nullable: false, length: 4 })
  estado_rol: string;

  @OneToMany(() => RolesUsuarioEntity, (rolesUsuario) => rolesUsuario.rol)
  rolesUser: RolesUsuarioEntity[];

  @OneToMany(() => RolMenuEntity, (rol_menu) => rol_menu.rol)
  roles_menus: RolMenuEntity[];
}
