// detalles-factura.controller.ts
import { Controller, Get, /*Post,Body,*/ Param } from '@nestjs/common';
import { DetallesFacturaService } from './detalles_factura.service';
//import { CreateDetalleFacturaDto } from './dtos/create-detalles_factura.dto';
import { DetalleFactura } from './entities/detalles_factura.entity';

@Controller('detalles-factura')
export class DetallesFacturaController {
  constructor(
    private readonly detallesFacturaService: DetallesFacturaService,
  ) {}

  /*@Post()
  create(
    @Body() createDetalleFacturaDto: CreateDetalleFacturaDto,
  ): Promise<DetalleFactura> {
    return this.detallesFacturaService.crearDetalleFactura(
      createDetalleFacturaDto,
    );
  }*/

  @Get()
  findAll(): Promise<DetalleFactura[]> {
    return this.detallesFacturaService.findAll();
  }

  @Get('factura/:id')
  findByFacturaId(@Param('id') id: string): Promise<DetalleFactura[]> {
    return this.detallesFacturaService.findByFacturaId(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<DetalleFactura> {
    return this.detallesFacturaService.findOne(+id);
  }
}
