import { Module } from '@nestjs/common';
import { RolMenuPermisoService } from './rol_menu_permiso.service';

@Module({
  providers: [RolMenuPermisoService],
})
export class RolMenuPermisoModule {}
