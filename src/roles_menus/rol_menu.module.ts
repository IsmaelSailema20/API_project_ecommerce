import { Module } from '@nestjs/common';
import { RolMenuService } from './rol_menu.service';
import { RolMenuController } from './rol_menu.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolMenuEntity } from './entities/rol_menu.entity';
import { RolesEntity } from 'src/roles/entities/roles.entity';
import { MenuEntity } from 'src/menus/entities/menu.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RolMenuEntity, RolesEntity, MenuEntity])],
  providers: [RolMenuService],
  controllers: [RolMenuController],
  exports: [TypeOrmModule],
})
export class RolMenuModule {}
