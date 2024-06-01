import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { CreateProductosDto } from './dtos/create-productos.dto';
import { ApiTags } from '@nestjs/swagger';
import { UpdateProductDto } from './dtos/update-product.dto';
@ApiTags('Productos')
@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @Get()
  async getAllProducts() {
    return this.productosService.getAllProducts();
  }

  @Get(':id')
  async getOneProduct(@Param('id') id: number) {
    return this.productosService.getOneProducts(id);
  }

  @Post()
  async createProduct(@Body() createProductDto: CreateProductosDto) {
    const newProduct =
      await this.productosService.createProducts(createProductDto);
    if (newProduct.success) {
      return { message: 'Producto Creado con exito', newProduct };
    } else {
      return { message: newProduct.message };
    }
  }

  @Put(':id')
  async updateMarca(
    @Param('id') id: number,
    @Body() updateProductosDto: UpdateProductDto,
  ) {
    const updateProduct = await this.productosService.updateProducts(
      id,
      updateProductosDto,
    );
    if (updateProduct.success) {
      return {
        message: 'La marca ha sido actualizada con exito',
        updateProduct,
      };
    } else {
      return { message: updateProduct.message };
    }
  }
}
