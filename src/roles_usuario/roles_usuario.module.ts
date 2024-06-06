import { Module } from '@nestjs/common';
import { RolesUsuarioController } from './roles_usuario.controller';
import { RolesUsuarioService } from './roles_usuario.service';
import { RolesUsuarioEntity } from './entities/roles_usuario.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([RolesUsuarioEntity])],
  controllers: [RolesUsuarioController],
  providers: [RolesUsuarioService],
})
export class RolesUsuarioModule {}
