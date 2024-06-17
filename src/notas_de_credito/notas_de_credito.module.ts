import { Module } from '@nestjs/common';
import { NotasDeCreditoService } from './notas_de_credito.service';
import { NotasDeCreditoController } from './notas_de_credito.controller';

@Module({
  providers: [NotasDeCreditoService],
  controllers: [NotasDeCreditoController]
})
export class NotasDeCreditoModule {}
