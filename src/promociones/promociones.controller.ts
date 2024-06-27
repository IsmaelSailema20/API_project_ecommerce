import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { PromocionesService } from './promociones.service';
import { CreatePromocionesDto } from './dtos/create-promociones.dto';
import { UpdatePromocionesDto } from './dtos/update-promociones.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Promociones')
@Controller('promociones')
export class PromocionesController {
  constructor(private readonly promocionesService: PromocionesService) {}

  @Post()
  async create(@Body() promocionDTO: CreatePromocionesDto) {
    return this.promocionesService.create(promocionDTO);
  }

  @Get()
  async findAll() {
    return this.promocionesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.promocionesService.findOne(id);
  }
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() promocionDTO: UpdatePromocionesDto,
  ) {
    return this.promocionesService.update(id, promocionDTO);
  }
}
