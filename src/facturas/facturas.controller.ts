import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { FacturasService } from './facturas.service';
import { CreateFacturaDto } from './dtos/create-facturas.dto';
import { Factura } from './entities/facturas.entity';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { MenuAccessGuard } from 'src/auth/guards/menu_access.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { PermisoAccessGuard } from 'src/auth/guards/permiso_access.guard';

@ApiTags('Facturas')
@ApiBearerAuth()
@Controller('facturas')
@UseGuards(JwtAuthGuard, MenuAccessGuard)
@SetMetadata('menu', 'FACTURAS')
export class FacturasController {
  constructor(private readonly facturasService: FacturasService) {}

  @Post()
  @ApiOperation({ summary: 'Crea una nueva factura' })
  @ApiBody({
    type: CreateFacturaDto,
    description: 'Dto para crear una factura',
  })
  @UseGuards(PermisoAccessGuard)
  @SetMetadata('permiso', 'CREAR')
  create(@Body() createFacturaDto: CreateFacturaDto): Promise<Factura> {
    return this.facturasService.create(createFacturaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtiene todas las facturas' })
  @UseGuards(PermisoAccessGuard)
  @SetMetadata('permiso', 'VISUALIZAR')
  findAll(): Promise<Factura[]> {
    return this.facturasService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtiene una factura por su ID' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'ID de la factura',
  })
  @UseGuards(PermisoAccessGuard)
  @SetMetadata('permiso', 'VISUALIZAR')
  findOne(@Param('id') id: string): Promise<Factura> {
    return this.facturasService.findOne(+id);
  }

  @Get('user/:name/:lastName')
  @ApiOperation({
    summary: 'Obtiene facturas por nombre y apellido del usuario',
  })
  @ApiParam({
    name: 'name',
    type: String,
    description: 'Nombre del usuario',
  })
  @ApiParam({
    name: 'lastName',
    type: String,
    description: 'Apellido del usuario',
  })
  @UseGuards(PermisoAccessGuard)
  @SetMetadata('permiso', 'VISUALIZAR')
  findByUserNameAndLastName(
    @Param('name') name: string,
    @Param('lastName') lastName: string,
  ): Promise<Factura[]> {
    return this.facturasService.findByUserName(name, lastName);
  }

  @Get('date/:date')
  @ApiOperation({ summary: 'Obtiene facturas por fecha' })
  @ApiParam({
    name: 'date',
    type: String,
    description: 'Fecha de la factura en formato YYYY-MM-DD',
  })
  @UseGuards(PermisoAccessGuard)
  @SetMetadata('permiso', 'VISUALIZAR')
  findByDate(@Param('date') date: string): Promise<Factura[]> {
    return this.facturasService.findByDate(new Date(date));
  }
}
