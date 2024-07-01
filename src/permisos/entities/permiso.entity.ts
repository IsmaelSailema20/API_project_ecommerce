import { RolMenuPermisoEntity } from 'src/roles_menus_permisos/entities/roles_menus_permisos.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('permisos')
export class PermisoEntity {
  @PrimaryGeneratedColumn()
  id_permiso: number;

  @Column()
  nombre: string;

  @OneToMany(() => RolMenuPermisoEntity, (rmp) => rmp.permiso)
  roles_menus_permisos: RolMenuPermisoEntity[];
}
