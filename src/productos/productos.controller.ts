import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { ProductosService } from './productos.service';
import { CreateProductosDto } from './dtos/create-productos.dto';
import { ApiTags } from '@nestjs/swagger';
import { UpdateProductDto } from './dtos/update-product.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { MenuAccessGuard } from 'src/auth/guards/menu_access.guard';
import { PermisoAccessGuard } from 'src/auth/guards/permiso_access.guard';

@ApiTags('Productos')
@Controller('productos')
@UseGuards(JwtAuthGuard, MenuAccessGuard)
@SetMetadata('menu', 'PRODUCTOS')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @Get()
  @UseGuards(PermisoAccessGuard)
  @SetMetadata('permiso', 'VISUALIZAR')
  async getAllProducts() {
    return this.productosService.getAllProducts();
  }

  @Get('estadoPro')
  @UseGuards(PermisoAccessGuard)
  @SetMetadata('permiso', 'VISUALIZAR')
  async getProductsByEstado(@Query('estadoPro') estado: string) {
    return this.productosService.getProductosAct(estado);
  }

  @Get('stock/:id')
  @UseGuards(PermisoAccessGuard)
  @SetMetadata('permiso', 'VISUALIZAR')
  async getStockProducto(@Param('id') id: number) {
    return this.productosService.getStrockProduc(id);
  }

  @Get('totalPCategoria')
  @UseGuards(PermisoAccessGuard)
  @SetMetadata('permiso', 'VISUALIZAR')
  async getTotalProduCategoria() {
    return this.productosService.getCantidadProductosByCategoria();
  }

  @Get(':id')
  @UseGuards(PermisoAccessGuard)
  @SetMetadata('permiso', 'VISUALIZAR')
  async getOneProduct(@Param('id') id: number) {
    return this.productosService.getOneProducts(id);
  }

  @Post()
  @UseGuards(PermisoAccessGuard)
  @SetMetadata('permiso', 'CREAR')
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
  @UseGuards(PermisoAccessGuard)
  @SetMetadata('permiso', 'EDITAR')
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

  @Patch(':id/estado')
  @UseGuards(PermisoAccessGuard)
  @SetMetadata('permiso', 'EDITAR')
  async updateProductEstado(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    const updateResult = await this.productosService.updateEstadoProducto(
      id,
      updateProductDto,
    );
    if (updateResult.success) {
      return {
        message: updateResult.message,
        product: updateResult.product,
      };
    } else {
      return {
        message: updateResult.message,
      };
    }
  }
}
