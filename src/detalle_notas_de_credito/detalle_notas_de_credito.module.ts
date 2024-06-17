import { Module } from '@nestjs/common';
import { DetalleNotasDeCreditoService } from './detalle_notas_de_credito.service';

@Module({
  providers: [DetalleNotasDeCreditoService]
})
export class DetalleNotasDeCreditoModule {}
