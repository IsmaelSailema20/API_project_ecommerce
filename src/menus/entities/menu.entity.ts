import { RolMenuEntity } from 'src/roles_menus/entities/rol_menu.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('menus')
export class MenuEntity {
  @PrimaryGeneratedColumn()
  id_menu: number;

  @Column()
  nombre: string;

  @OneToMany(() => RolMenuEntity, (rol_menu) => rol_menu.menu)
  roles_menus: RolMenuEntity[];
}
