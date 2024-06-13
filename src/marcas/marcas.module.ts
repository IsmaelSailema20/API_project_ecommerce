import { Module } from '@nestjs/common';
import { MarcasService } from './marcas.service';
import { MarcasController } from './marcas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MarcasEntity } from './entities/marcas.entity';
import { MenuEntity } from 'src/menus/entities/menu.entity';
import { RolMenuEntity } from 'src/roles_menus/entities/rol_menu.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([MarcasEntity, MenuEntity, RolMenuEntity]),
  ],
  providers: [MarcasService],
  controllers: [MarcasController],
})
export class MarcasModule {}
