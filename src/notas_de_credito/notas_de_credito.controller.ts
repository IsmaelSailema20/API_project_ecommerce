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
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { CreateNotasDeCreditoDto } from './dtos/create-notas_de_credito.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { MenuAccessGuard } from 'src/auth/guards/menu_access.guard';
import { PermisoAccessGuard } from 'src/auth/guards/permiso_access.guard';
import { UpdateNotasDeCreditoDto } from './dtos/update-notas_de_credito.dto copy';

@ApiTags('Notas de Crédito')
@ApiBearerAuth()
@Controller('notas-de-credito')
@UseGuards(JwtAuthGuard, MenuAccessGuard)
@SetMetadata('menu', 'NOTAS_CREDITO')
export class NotasDeCreditoController {
  constructor(private readonly notaDeCreditoService: NotasDeCreditoService) {}

  @Post()
  @ApiOperation({ summary: 'Crea una nueva nota de crédito' })
  @ApiBody({
    type: CreateNotasDeCreditoDto,
    description: 'Dto para crear una nota de crédito',
  })
  @UseGuards(PermisoAccessGuard)
  @SetMetadata('permiso', 'CREAR')
  create(@Body() createNotaDeCreditoDto: CreateNotasDeCreditoDto) {
    return this.notaDeCreditoService.createNotasDeCredito(
      createNotaDeCreditoDto,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Obtiene todas las notas de crédito' })
  @UseGuards(PermisoAccessGuard)
  @SetMetadata('permiso', 'VISUALIZAR')
  async getAllNotasDeCredito() {
    const result = await this.notaDeCreditoService.getAllNotasDeCredito();
    return result;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtiene una nota de crédito por su ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID de la nota de crédito',
  })
  @UseGuards(PermisoAccessGuard)
  @SetMetadata('permiso', 'VISUALIZAR')
  async getNotaDeCreditoById(@Param('id') id: number) {
    const result = await this.notaDeCreditoService.getNotaDeCreditoById(id);
    return result;
  }

  @Patch(':id/estado')
  @ApiOperation({ summary: 'Actualiza el estado de una nota de crédito' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID de la nota de crédito',
  })
  @ApiBody({
    type: UpdateNotasDeCreditoDto,
    description: 'Dto para actualizar el estado de una nota de crédito',
  })
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
