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
import { ApiTags } from '@nestjs/swagger';
import { MenuAccessGuard } from 'src/auth/guards/menu_access.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { PermisoAccessGuard } from 'src/auth/guards/permiso_access.guard';

@ApiTags('Facturas')
@Controller('facturas')
@UseGuards(JwtAuthGuard, MenuAccessGuard)
@SetMetadata('menu', 'FACTURAS')
export class FacturasController {
  constructor(private readonly facturasService: FacturasService) {}

  @Post()
  @UseGuards(PermisoAccessGuard)
  @SetMetadata('permiso', 'CREAR')
  create(@Body() createFacturaDto: CreateFacturaDto): Promise<Factura> {
    return this.facturasService.create(createFacturaDto);
  }

  @Get()
  @UseGuards(PermisoAccessGuard)
  @SetMetadata('permiso', 'VISUALIZAR')
  findAll(): Promise<Factura[]> {
    return this.facturasService.findAll();
  }

  @Get(':id')
  @UseGuards(PermisoAccessGuard)
  @SetMetadata('permiso', 'VISUALIZAR')
  findOne(@Param('id') id: string): Promise<Factura> {
    return this.facturasService.findOne(+id);
  }

  @Get('user/:name/:lastName')
  @UseGuards(PermisoAccessGuard)
  @SetMetadata('permiso', 'VISUALIZAR')
  findByUserNameAndLastName(
    @Param('name') name: string,
    @Param('lastName') lastName: string,
  ): Promise<Factura[]> {
    return this.facturasService.findByUserName(name, lastName);
  }

  @Get('date/:date')
  @UseGuards(PermisoAccessGuard)
  @SetMetadata('permiso', 'VISUALIZAR')
  findByDate(@Param('date') date: string): Promise<Factura[]> {
    return this.facturasService.findByDate(new Date(date));
  }
}
