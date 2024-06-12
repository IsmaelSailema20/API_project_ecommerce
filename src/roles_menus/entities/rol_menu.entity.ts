import { MenuEntity } from 'src/menus/entities/menu.entity';
import { RolesEntity } from 'src/roles/entities/roles.entity';
import { RolMenuPermisoEntity } from 'src/roles_menus_permisos/entities/roles_menus_permisos.entity';
import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('menus')
export class RolMenuEntity {
  @PrimaryGeneratedColumn()
  id_rol_menu: number;

  @ManyToOne(() => RolesEntity, (roles) => roles.roles_menus)
  @JoinColumn({ name: 'id_rol' })
  rol: RolesEntity;

  @ManyToOne(() => MenuEntity, (menu) => menu.roles_menus)
  @JoinColumn({ name: 'id_menu' })
  menu: MenuEntity;

  @OneToMany(() => RolMenuPermisoEntity, (rmp) => rmp.id_rol_menu_permiso)
  roles_menus_permisos: RolMenuPermisoEntity[];
}
