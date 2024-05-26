import { Module } from '@nestjs/common';
import { TiposIdentifcadoresController } from './tipos-identifcadores.controller';
import { TiposIdentifcadoresService } from './tipos-identifcadores.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TiposIdentificacionEntity } from 'src/tipos-identifcadores/entities/tipos-identificacion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TiposIdentificacionEntity])],
  controllers: [TiposIdentifcadoresController],
  providers: [TiposIdentifcadoresService],
})
export class TiposIdentifcadoresModule {}
