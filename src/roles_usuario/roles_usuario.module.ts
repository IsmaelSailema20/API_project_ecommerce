import { Module } from '@nestjs/common';
import { RolesUsuarioController } from './roles_usuario.controller';
import { RolesUsuarioService } from './roles_usuario.service';

@Module({
  controllers: [RolesUsuarioController],
  providers: [RolesUsuarioService]
})
export class RolesUsuarioModule {}
