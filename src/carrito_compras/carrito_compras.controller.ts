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
import { CarritoComprasService } from './carrito_compras.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateCarritoComprasDto } from './dtos/create-carrito_compras.dto';
import { UpdateCarritoCompras } from './dtos/update-carrito_compras.dto';
import { UpdateCarritoEstadoDto } from './dtos/update-estado-carrito_compras.dto';
import { UpdateProductoCarritoDto } from './dtos/update-Cantidad-Productos-carrito.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { MenuAccessGuard } from 'src/auth/guards/menu_access.guard';
import { PermisoAccessGuard } from 'src/auth/guards/permiso_access.guard';

@ApiTags('Carrito-De-Compras')
@Controller('carrito-compras')
@UseGuards(JwtAuthGuard, MenuAccessGuard)
@SetMetadata('menu', 'CARRITOS')
export class CarritoComprasController {
  constructor(private readonly carritoComprasService: CarritoComprasService) {}

  @Post()
  @UseGuards(PermisoAccessGuard)
  @SetMetadata('permiso', 'CREAR')
  create(@Body() createCarritoDto: CreateCarritoComprasDto) {
    return this.carritoComprasService.createCarritoCompras(createCarritoDto);
  }

  @Get()
  @UseGuards(PermisoAccessGuard)
  @SetMetadata('permiso', 'VISUALIZAR')
  getAllCarritosCompras() {
    return this.carritoComprasService.getAllCarritos();
  }

  @Get(':id')
  @UseGuards(PermisoAccessGuard)
  @SetMetadata('permiso', 'VISUALIZAR')
  getOneCarritoCompras(@Param('id') id: number) {
    return this.carritoComprasService.getCarritoById(id);
  }

  @Patch('add-productos')
  @UseGuards(PermisoAccessGuard)
  @SetMetadata('permiso', 'EDITAR')
  async addProductosToCarrito(
    @Body() addProductosCarritoDto: UpdateCarritoCompras,
  ) {
    return this.carritoComprasService.addProductosToCarrito(
      addProductosCarritoDto,
    );
  }

  @Patch(':id/estado')
  @UseGuards(PermisoAccessGuard)
  @SetMetadata('permiso', 'EDITAR')
  async updateCarritoEstado(
    @Param('id') id_usuario: number,
    @Body() updateCarritoEstadoDto: UpdateCarritoEstadoDto,
  ) {
    return this.carritoComprasService.updateCarritoEstado(
      id_usuario,
      updateCarritoEstadoDto,
    );
  }

  @Patch(':id_carrito/producto')
  @UseGuards(PermisoAccessGuard)
  @SetMetadata('permiso', 'EDITAR')
  async updateProductoCantidad(
    @Param('id_carrito') id_carrito: number,
    @Body() updateProductoCarritoDto: UpdateProductoCarritoDto,
  ) {
    return this.carritoComprasService.updateProductoCantidad(
      id_carrito,
      updateProductoCarritoDto,
    );
  }
}
