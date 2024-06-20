import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { NotasDeCreditoService } from './notas_de_credito.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateNotasDeCreditoDto } from './dtos/create-notas_de_credito.dto';
import { UpdateNotasDeCreditoDto } from './dtos/update-notas_de_credito.dto copy';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { MenuAccessGuard } from 'src/auth/guards/menu_access.guard';
import { PermisoAccessGuard } from 'src/auth/guards/permiso_access.guard';

@ApiTags('Notas-De-Credito')
@Controller('notas-de-credito')
@UseGuards(JwtAuthGuard, MenuAccessGuard)
@SetMetadata('menu', 'NOTAS_CREDITO')
export class NotasDeCreditoController {
  constructor(private readonly notaDeCreditoService: NotasDeCreditoService) {}

  @Post()
  @UseGuards(PermisoAccessGuard)
  @SetMetadata('permiso', 'CREAR')
  create(@Body() createNotaDeCreditoDto: CreateNotasDeCreditoDto) {
    return this.notaDeCreditoService.createNotasDeCredito(
      createNotaDeCreditoDto,
    );
  }

  @Get()
  @UseGuards(PermisoAccessGuard)
  @SetMetadata('permiso', 'VISUALIZAR')
  async getAllNotasDeCredito() {
    const result = await this.notaDeCreditoService.getAllNotasDeCredito();
    return result;
  }

  @Get(':id')
  @UseGuards(PermisoAccessGuard)
  @SetMetadata('permiso', 'VISUALIZAR')
  async getNotaDeCreditoById(@Param('id') id: number) {
    const result = await this.notaDeCreditoService.getNotaDeCreditoById(id);
    return result;
  }

  @Patch(':id/estado')
  @UseGuards(PermisoAccessGuard)
  @SetMetadata('permiso', 'EDITAR')
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
