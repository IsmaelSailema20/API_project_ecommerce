import { Module } from '@nestjs/common';
import { PromocionesService } from './promociones.service';
import { PromocionesController } from './promociones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PromocionesEntity } from './entities/promociones.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PromocionesEntity])],
  providers: [PromocionesService],
  controllers: [PromocionesController],
})
export class PromocionesModule {}
