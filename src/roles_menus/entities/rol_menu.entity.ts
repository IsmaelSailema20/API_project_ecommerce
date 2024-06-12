import { MenuEntity } from 'src/menus/entities/menu.entity';
import { RolesEntity } from 'src/roles/entities/roles.entity';
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('menus')
export class RolMenuEntity {
  @PrimaryGeneratedColumn()
  id_rol_menu: number;

  @ManyToOne(() => RolesEntity, (roles) => roles.id_rol)
  @JoinColumn({ name: 'id_rol' })
  id_rol: RolesEntity;

  @ManyToOne(() => MenuEntity, (menu) => menu.id_menu)
  @JoinColumn({ name: 'id_menu' })
  id_menu: MenuEntity;
}
