import { PermisoEntity } from 'src/permisos/entities/permiso.entity';
import { RolMenuEntity } from 'src/roles_menus/entities/rol_menu.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('roles_menus_permisos')
export class RolMenuPermisoEntity {
  @PrimaryGeneratedColumn()
  id_rol_menu_permiso: number;

  @ManyToOne(() => RolMenuEntity, (rol_menu) => rol_menu.id_rol_menu)
  rol_menu: RolMenuEntity;

  @ManyToOne(() => PermisoEntity, (permiso) => permiso.id_permiso)
  permiso: PermisoEntity;
}
