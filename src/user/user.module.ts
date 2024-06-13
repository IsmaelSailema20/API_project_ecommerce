import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonEntity, UserEntity } from './entities';
import { RolesEntity } from 'src/roles/entities/roles.entity';
import { RolesUsuarioEntity } from 'src/roles_usuario/entities/roles_usuario.entity';
import { MenuEntity } from 'src/menus/entities/menu.entity';
import { RolMenuEntity } from 'src/roles_menus/entities/rol_menu.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      PersonEntity,
      RolesEntity,
      RolesUsuarioEntity,
      MenuEntity,
      RolMenuEntity,
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
