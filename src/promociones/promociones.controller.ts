import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { PromocionesService } from './promociones.service';
import { CreatePromocionesDto } from './dtos/create-promociones.dto';
import { UpdatePromocionesDto } from './dtos/update-promociones.dto';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { MenuAccessGuard } from 'src/auth/guards/menu_access.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { PermisoAccessGuard } from 'src/auth/guards/permiso_access.guard';

@ApiTags('Promociones')
@ApiBearerAuth()
@Controller('promociones')
@UseGuards(JwtAuthGuard, MenuAccessGuard)
@SetMetadata('menu', 'PROMOCIONES')
export class PromocionesController {
  constructor(private readonly promocionesService: PromocionesService) {}

  @Post()
  @ApiOperation({ summary: 'Crea una nueva promoción' })
  @ApiBody({
    type: CreatePromocionesDto,
    description: 'Dto para crear una promoción',
  })
  @UseGuards(PermisoAccessGuard)
  @SetMetadata('permiso', 'CREAR')
  async create(@Body() promocionDTO: CreatePromocionesDto) {
    return this.promocionesService.create(promocionDTO);
  }

  @Get()
  @ApiOperation({ summary: 'Obtiene todas las promociones' })
  @UseGuards(PermisoAccessGuard)
  @SetMetadata('permiso', 'VISUALIZAR')
  async findAll() {
    return this.promocionesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtiene una promoción por su ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID de la promoción',
  })
  @UseGuards(PermisoAccessGuard)
  @SetMetadata('permiso', 'VISUALIZAR')
  async findOne(@Param('id') id: number) {
    return this.promocionesService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualiza una promoción por su ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID de la promoción',
  })
  @ApiBody({
    type: UpdatePromocionesDto,
    description: 'Dto para actualizar una promoción',
  })
  @UseGuards(PermisoAccessGuard)
  @SetMetadata('permiso', 'EDITAR')
  async update(
    @Param('id') id: number,
    @Body() promocionDTO: UpdatePromocionesDto,
  ) {
    return this.promocionesService.update(id, promocionDTO);
  }
}
