import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { FacturasService } from './facturas.service';
import { CreateFacturaDto } from './dtos/create-facturas.dto';
import { Factura } from './entities/facturas.entity';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Facturas')
@Controller('facturas')
export class FacturasController {
  constructor(private readonly facturasService: FacturasService) {}

  @Post()
  create(@Body() createFacturaDto: CreateFacturaDto): Promise<Factura> {
    return this.facturasService.create(createFacturaDto);
  }

  @Get()
  findAll(): Promise<Factura[]> {
    return this.facturasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Factura> {
    return this.facturasService.findOne(+id);
  }

  @Get('user/:name/:lastName')
  findByUserNameAndLastName(
    @Param('name') name: string,
    @Param('lastName') lastName: string,
  ): Promise<Factura[]> {
    return this.facturasService.findByUserName(name, lastName);
  }

  @Get('date/:date')
  findByDate(@Param('date') date: string): Promise<Factura[]> {
    return this.facturasService.findByDate(new Date(date));
  }
}
