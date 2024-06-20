import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { MetodosPagoService } from './metodosPago.service';
import { CreateMetodosPagoDto } from './dtos/create-metodosPago.dto';
import { MetodosPago } from './entities/metodosPago.entity';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { MenuAccessGuard } from 'src/auth/guards/menu_access.guard';
import { PermisoAccessGuard } from 'src/auth/guards/permiso_access.guard';

@ApiTags('Metodos-de-pago')
@Controller('metodos-pago')
@UseGuards(JwtAuthGuard, MenuAccessGuard)
@SetMetadata('menu', 'METODOS_PAGO')
export class MetodosPagoController {
  constructor(private readonly metodosPagoService: MetodosPagoService) {}

  @Post()
  @UseGuards(PermisoAccessGuard)
  @SetMetadata('permiso', 'CREAR')
  create(
    @Body() createMetodosPagoDto: CreateMetodosPagoDto,
  ): Promise<MetodosPago> {
    return this.metodosPagoService.create(createMetodosPagoDto);
  }

  @Get()
  @UseGuards(PermisoAccessGuard)
  @SetMetadata('permiso', 'VISUALIZAR')
  findAll(): Promise<MetodosPago[]> {
    return this.metodosPagoService.findAll();
  }

  @Get(':id')
  @UseGuards(PermisoAccessGuard)
  @SetMetadata('permiso', 'VISUALIZAR')
  findOne(@Param('id') id: number): Promise<MetodosPago> {
    return this.metodosPagoService.findOne(id);
  }

  @Patch(':metodoPagoId/users/:userId')
  @UseGuards(PermisoAccessGuard)
  @SetMetadata('permiso', 'EDITAR')
  addUserToMetodoPago(
    @Param('metodoPagoId') metodoPagoId: string,
    @Param('userId') userId: string,
  ): Promise<void> {
    return this.metodosPagoService.addUserToMetodoPago(+metodoPagoId, +userId);
  }
}
