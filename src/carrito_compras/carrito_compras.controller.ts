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
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { CreateCarritoComprasDto } from './dtos/create-carrito_compras.dto';
import { UpdateCarritoCompras } from './dtos/update-carrito_compras.dto';
import { UpdateCarritoEstadoDto } from './dtos/update-estado-carrito_compras.dto';
import { UpdateProductoCarritoDto } from './dtos/update-Cantidad-Productos-carrito.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { MenuAccessGuard } from 'src/auth/guards/menu_access.guard';
import { PermisoAccessGuard } from 'src/auth/guards/permiso_access.guard';
import { CarritoComprasEntity } from './entities/carrito_compras.entity';

@ApiTags('Carrito de Compras')
@ApiBearerAuth()
@Controller('carrito-compras')
@UseGuards(JwtAuthGuard, MenuAccessGuard)
@SetMetadata('menu', 'CARRITOS')
export class CarritoComprasController {
  constructor(private readonly carritoComprasService: CarritoComprasService) {}

  @Post()
  @ApiOperation({ summary: 'Crea un nuevo carrito de compras' })
  @ApiBody({
    type: CreateCarritoComprasDto,
    description: 'Dto para crear carrito de compras',
  })
  @UseGuards(PermisoAccessGuard)
  @SetMetadata('permiso', 'CREAR')
  create(@Body() createCarritoDto: CreateCarritoComprasDto) {
    return this.carritoComprasService.createCarritoCompras(createCarritoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtiene todos los carritos de compras' })
  @ApiResponse({
    status: 200,
    description: 'Lista de todos los carritos de compras',
    type: [CarritoComprasEntity],
  })
  @UseGuards(PermisoAccessGuard)
  @SetMetadata('permiso', 'VISUALIZAR')
  getAllCarritosCompras() {
    return this.carritoComprasService.getAllCarritos();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtiene un carrito de compras por su ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID del carrito de compras',
  })
  @ApiResponse({
    status: 200,
    description: 'Carrito de compras encontrado',
    type: CarritoComprasEntity,
  })
  @UseGuards(PermisoAccessGuard)
  @SetMetadata('permiso', 'VISUALIZAR')
  getOneCarritoCompras(@Param('id') id: number) {
    return this.carritoComprasService.getCarritoById(id);
  }

  @Patch('add-productos')
  @ApiOperation({ summary: 'Añade productos al carrito de compras' })
  @ApiBody({
    type: UpdateCarritoCompras,
    description: 'Dto para añadir productos al carrito de compras',
  })
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
  @ApiOperation({ summary: 'Actualiza el estado del carrito de compras' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID del carrito de compras',
  })
  @ApiBody({
    type: UpdateCarritoEstadoDto,
    description: 'Dto para actualizar el estado del carrito de compras',
  })
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
  @ApiOperation({
    summary: 'Actualiza la cantidad de un producto en el carrito de compras',
  })
  @ApiParam({
    name: 'id_carrito',
    type: Number,
    description: 'ID del carrito de compras',
  })
  @ApiBody({
    type: UpdateProductoCarritoDto,
    description:
      'Dto para actualizar la cantidad de un producto en el carrito de compras',
  })
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
