import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { MetodosPagoService } from './metodosPago.service';
import { CreateMetodosPagoDto } from './dtos/create-metodosPago.dto';
import { MetodosPago } from './entities/metodosPago.entity';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Metodos-de-pago')
@Controller('metodos-pago')
export class MetodosPagoController {
  constructor(private readonly metodosPagoService: MetodosPagoService) {}

  @Post()
  create(
    @Body() createMetodosPagoDto: CreateMetodosPagoDto,
  ): Promise<MetodosPago> {
    return this.metodosPagoService.create(createMetodosPagoDto);
  }

  @Get()
  findAll(): Promise<MetodosPago[]> {
    return this.metodosPagoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<MetodosPago> {
    return this.metodosPagoService.findOne(id);
  }

  @Patch(':metodoPagoId/users/:userId')
  addUserToMetodoPago(
    @Param('metodoPagoId') metodoPagoId: string,
    @Param('userId') userId: string,
  ): Promise<void> {
    return this.metodosPagoService.addUserToMetodoPago(+metodoPagoId, +userId);
  }
}
