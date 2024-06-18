import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CarritoComprasService } from './carrito_compras.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateCarritoComprasDto } from './dtos/create-carrito_compras.dto';
import { UpdateCarritoCompras } from './dtos/update-carrito_compras.dto';
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
}
