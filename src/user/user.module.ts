import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonEntity, UserEntity } from './entities';
import { RolesEntity } from 'src/roles/entities/roles.entity';
import { RolesUsuarioEntity } from 'src/roles_usuario/entities/roles_usuario.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      PersonEntity,
      RolesEntity,
      RolesUsuarioEntity,
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
