import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonEntity, UserEntity } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, PersonEntity])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
