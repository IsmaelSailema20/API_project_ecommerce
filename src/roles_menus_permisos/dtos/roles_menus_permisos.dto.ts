import { PermisoEntity } from 'src/permisos/entities/permiso.entity';
import { RolMenuEntity } from 'src/roles_menus/entities/rol_menu.entity';

export class CreateRolMenuPermiso {
  rol_menu: RolMenuEntity;
  permiso: PermisoEntity;
  estado: string;
}
