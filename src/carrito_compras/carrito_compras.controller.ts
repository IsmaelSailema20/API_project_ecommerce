import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CarritoComprasService } from './carrito_compras.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateCarritoComprasDto } from './dtos/create-carrito_compras.dto';
import { UpdateCarritoCompras } from './dtos/update-carrito_compras.dto';
import { UpdateCarritoEstadoDto } from './dtos/update-estado-carrito_compras.dto';
import { UpdateProductoCarritoDto } from './dtos/update-Cantidad-Productos-carrito.dto';
@ApiTags('Carrito-De-Compras')
@Controller('carrito-compras')
export class CarritoComprasController {
  constructor(private readonly carritoComprasService: CarritoComprasService) {}
  @Post()
  create(@Body() createCarritoDto: CreateCarritoComprasDto) {
    return this.carritoComprasService.createCarritoCompras(createCarritoDto);
  }

  @Get()
  getAllCarritosCompras() {
    return this.carritoComprasService.getAllCarritos();
  }

  @Get(':id')
  getOneCarritoCompras(@Param('id') id: number) {
    return this.carritoComprasService.getCarritoById(id);
  }

  @Patch('add-productos')
  async addProductosToCarrito(
    @Body() addProductosCarritoDto: UpdateCarritoCompras,
  ) {
    return this.carritoComprasService.addProductosToCarrito(
      addProductosCarritoDto,
    );
  }

  @Patch(':id/estado')
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
