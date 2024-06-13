// menus.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuEntity } from './entities/menu.entity';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { RolMenuEntity } from 'src/roles_menus/entities/rol_menu.entity';
import { RolesEntity } from 'src/roles/entities/roles.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RolesEntity, MenuEntity, RolMenuEntity])],
  providers: [MenuService],
  controllers: [MenuController],
  exports: [TypeOrmModule],
})
export class MenuModule {}
