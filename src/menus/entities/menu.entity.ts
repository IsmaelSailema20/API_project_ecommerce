import { ApiProperty } from '@nestjs/swagger';
import { RolMenuEntity } from 'src/roles_menus/entities/rol_menu.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('menus')
export class MenuEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 1,
  })
  id_menu: number;

  @ApiProperty({
    example: 'CATEGORIAS',
  })
  @Column()
  nombre: string;

  @ApiProperty({
    example: [{}],
  })
  @OneToMany(() => RolMenuEntity, (rol_menu) => rol_menu.menu)
  roles_menus: RolMenuEntity[];
}
