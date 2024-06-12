import { Module } from '@nestjs/common';
import { RolMenuService } from './rol_menu.service';
import { RolMenuController } from './rol_menu.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolMenuEntity } from './entities/rol_menu.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RolMenuEntity])],
  providers: [RolMenuService],
  controllers: [RolMenuController],
})
export class RolMenuModule {}
