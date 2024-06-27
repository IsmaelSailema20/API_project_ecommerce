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
import { ApiTags } from '@nestjs/swagger';
import { MenuAccessGuard } from 'src/auth/guards/menu_access.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { PermisoAccessGuard } from 'src/auth/guards/permiso_access.guard';

@ApiTags('Promociones')
@Controller('promociones')
@UseGuards(JwtAuthGuard, MenuAccessGuard)
@SetMetadata('menu', 'PROMOCIONES')
export class PromocionesController {
  constructor(private readonly promocionesService: PromocionesService) {}

  @Post()
  @UseGuards(PermisoAccessGuard)
  @SetMetadata('permiso', 'CREAR')
  async create(@Body() promocionDTO: CreatePromocionesDto) {
    return this.promocionesService.create(promocionDTO);
  }

  @Get()
  @UseGuards(PermisoAccessGuard)
  @SetMetadata('permiso', 'VISUALIZAR')
  async findAll() {
    return this.promocionesService.findAll();
  }

  @Get(':id')
  @UseGuards(PermisoAccessGuard)
  @SetMetadata('permiso', 'VISUALIZAR')
  async findOne(@Param('id') id: number) {
    return this.promocionesService.findOne(id);
  }

  @UseGuards(PermisoAccessGuard)
  @SetMetadata('permiso', 'EDITAR')
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() promocionDTO: UpdatePromocionesDto,
  ) {
    return this.promocionesService.update(id, promocionDTO);
  }
}
