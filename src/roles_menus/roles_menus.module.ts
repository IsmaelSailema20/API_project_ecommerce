import { Module } from '@nestjs/common';
import { RolesMenusService } from './roles_menus.service';
import { RolesMenusController } from './roles_menus.controller';

@Module({
  providers: [RolesMenusService],
  controllers: [RolesMenusController]
})
export class RolesMenusModule {}
