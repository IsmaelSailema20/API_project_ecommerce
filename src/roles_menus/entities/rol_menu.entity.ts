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

@Entity('roles_menus')
export class RolMenuEntity {
  @PrimaryGeneratedColumn()
  id_rol_menu: number;

  @ManyToOne(() => RolesEntity, (roles) => roles.roles_menus)
  @JoinColumn({ name: 'id_rol' })
  rol: RolesEntity;

  @ManyToOne(() => MenuEntity, (menu) => menu.roles_menus)
  @JoinColumn({ name: 'id_menu' })
  menu: MenuEntity;

  @OneToMany(() => RolMenuPermisoEntity, (rmp) => rmp.rol_menu)
  roles_menus_permisos: RolMenuPermisoEntity[];
}
