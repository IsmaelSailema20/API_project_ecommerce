import { Module } from '@nestjs/common';
import { RolesMenusPermisosService } from './roles_menus_permisos.service';

@Module({
  providers: [RolesMenusPermisosService]
})
export class RolesMenusPermisosModule {}
