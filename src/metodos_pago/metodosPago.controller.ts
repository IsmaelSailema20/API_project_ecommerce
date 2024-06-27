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
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { MenuAccessGuard } from 'src/auth/guards/menu_access.guard';
import { PermisoAccessGuard } from 'src/auth/guards/permiso_access.guard';

@ApiTags('Metodos de Pago')
@ApiBearerAuth()
@Controller('metodos-pago')
@UseGuards(JwtAuthGuard, MenuAccessGuard)
@SetMetadata('menu', 'METODOS_PAGO')
export class MetodosPagoController {
  constructor(private readonly metodosPagoService: MetodosPagoService) {}

  @Post()
  @ApiOperation({ summary: 'Crea un nuevo método de pago' })
  @ApiBody({
    type: CreateMetodosPagoDto,
    description: 'Dto para crear un método de pago',
  })
  @UseGuards(PermisoAccessGuard)
  @SetMetadata('permiso', 'CREAR')
  create(
    @Body() createMetodosPagoDto: CreateMetodosPagoDto,
  ): Promise<MetodosPago> {
    return this.metodosPagoService.create(createMetodosPagoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtiene todos los métodos de pago' })
  @UseGuards(PermisoAccessGuard)
  @SetMetadata('permiso', 'VISUALIZAR')
  findAll(): Promise<MetodosPago[]> {
    return this.metodosPagoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtiene un método de pago por su ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID del método de pago',
  })
  @UseGuards(PermisoAccessGuard)
  @SetMetadata('permiso', 'VISUALIZAR')
  findOne(@Param('id') id: number): Promise<MetodosPago> {
    return this.metodosPagoService.findOne(id);
  }

  @Patch(':metodoPagoId/users/:userId')
  @ApiOperation({ summary: 'Asigna un usuario a un método de pago' })
  @ApiParam({
    name: 'metodoPagoId',
    type: String,
    description: 'ID del método de pago',
  })
  @ApiParam({
    name: 'userId',
    type: String,
    description: 'ID del usuario',
  })
  @UseGuards(PermisoAccessGuard)
  @SetMetadata('permiso', 'EDITAR')
  addUserToMetodoPago(
    @Param('metodoPagoId') metodoPagoId: string,
    @Param('userId') userId: string,
  ): Promise<void> {
    return this.metodosPagoService.addUserToMetodoPago(+metodoPagoId, +userId);
  }
}
