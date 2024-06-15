import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetodosPago } from './entities/metodosPago.entity';
import { MetodosPagoService } from './metodosPago.service';
import { MetodosPagoController } from './metodosPago.controller';
import { UserEntity } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MetodosPago, UserEntity])],
  providers: [MetodosPagoService],
  controllers: [MetodosPagoController],
})
export class MetodosPagoModule {}
