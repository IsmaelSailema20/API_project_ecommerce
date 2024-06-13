import { Controller, Get, Param, Post, Body, Put } from '@nestjs/common';
import { TiposIdentifcadoresService } from './tipos-identifcadores.service';
import { CreateTipoIdentfDto } from 'src/tipos-identifcadores/dtos/create-tipo-identf.dto';
import { UpdateTipoIdentfDto } from 'src/tipos-identifcadores/dtos/update-tipo-identf.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Tipos de identificacion')
@Controller('tipos-identificacion')
export class TiposIdentifcadoresController {
  constructor(
    private readonly tiposIdentfService: TiposIdentifcadoresService,
  ) {}

  @Get()
  async getAllTiposIdentf() {
    return this.tiposIdentfService.getAllTiposIdentificadores();
  }
  @Get(':id')
  async getOneTiposIdentf(@Param('id') id: number) {
    return this.tiposIdentfService.getOneTiposIdentificadores(id);
  }

  @Post()
  async createTiposIdentf(@Body() createTiposIdentfDto: CreateTipoIdentfDto) {
    const newTipoIndentf =
      await this.tiposIdentfService.createTipoIdentif(createTiposIdentfDto);
    if (newTipoIndentf.success) {
      return { message: 'Tipo De Identificacion creado', newTipoIndentf };
    } else {
      return { message: newTipoIndentf.message };
    }
  }

  @Put(':id')
  async updateTiposIdentif(
    @Param('id') id: number,
    @Body() updateTiposIdentfDto: UpdateTipoIdentfDto,
  ) {
    const updateTipoIdentif = await this.tiposIdentfService.updateTipoIdentif(
      id,
      updateTiposIdentfDto,
    );
    if (updateTipoIdentif.success) {
      return { message: 'Tipo Identificacion Actualizado', updateTipoIdentif };
    } else {
      return { message: updateTipoIdentif.message };
    }
  }
}
