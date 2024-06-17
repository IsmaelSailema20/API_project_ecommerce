import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { NotasDeCreditoService } from './notas_de_credito.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateNotasDeCreditoDto } from './dtos/create-notas_de_credito.dto';
import { UpdateNotasDeCreditoDto } from './dtos/update-notas_de_credito.dto copy';
@ApiTags('Notas-De-Credito')
@Controller('notas-de-credito')
export class NotasDeCreditoController {
  constructor(private readonly notaDeCreditoService: NotasDeCreditoService) {}

  @Post()
  create(@Body() createNotaDeCreditoDto: CreateNotasDeCreditoDto) {
    return this.notaDeCreditoService.createNotasDeCredito(
      createNotaDeCreditoDto,
    );
  }

  @Get()
  async getAllNotasDeCredito() {
    const result = await this.notaDeCreditoService.getAllNotasDeCredito();
    return result;
  }

  @Get(':id')
  async getNotaDeCreditoById(@Param('id') id: number) {
    const result = await this.notaDeCreditoService.getNotaDeCreditoById(id);
    return result;
  }

  @Patch(':id/estado')
  async updateEstadoNotaDeCredito(
    @Param('id') id: number,
    @Body() updateEstadoDto: UpdateNotasDeCreditoDto,
  ) {
    const result = await this.notaDeCreditoService.updateEstadoNotaDeCredito(
      id,
      updateEstadoDto,
    );
    return result;
  }
}
