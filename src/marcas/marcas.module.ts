import { Module } from '@nestjs/common';
import { MarcasService } from './marcas.service';
import { MarcasController } from './marcas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MarcasEntity } from './entities/marcas.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MarcasEntity])],
  providers: [MarcasService],
  controllers: [MarcasController],
})
export class MarcasModule {}
