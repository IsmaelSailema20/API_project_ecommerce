import { Module } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CategoriasController } from './categorias.controller';
import { CategoriasEntity } from './entities/categorias.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CategoriasEntity])],
  providers: [CategoriasService],
  controllers: [CategoriasController],
})
export class CategoriasModule {}
