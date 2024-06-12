import { RolMenuPermisoEntity } from 'src/roles_menus_permisos/entities/roles_menus_permisos.entities';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('permisos')
export class PermisoEntity {
  @PrimaryGeneratedColumn()
  id_permiso: number;

  @Column()
  nombre: string;

  @OneToMany(
    () => RolMenuPermisoEntity,
    (rol_menu_permiso) => rol_menu_permiso.id_rol_menu_permiso,
  )
  rol_menu_permiso: RolMenuPermisoEntity[];
}
