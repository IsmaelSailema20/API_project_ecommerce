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
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiParam,
  ApiQuery,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { UpdateProductDto } from './dtos/update-product.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { MenuAccessGuard } from 'src/auth/guards/menu_access.guard';
import { PermisoAccessGuard } from 'src/auth/guards/permiso_access.guard';

@ApiTags('Productos')
@ApiBearerAuth()
@Controller('productos')
@UseGuards(JwtAuthGuard, MenuAccessGuard)
@SetMetadata('menu', 'PRODUCTOS')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @Get()
  @ApiOperation({ summary: 'Obtiene todos los productos' })
  @UseGuards(PermisoAccessGuard)
  @SetMetadata('permiso', 'VISUALIZAR')
  async getAllProducts() {
    return this.productosService.getAllProducts();
  }

  @Get('estadoPro')
  @ApiOperation({ summary: 'Obtiene productos por estado' })
  @ApiQuery({
    name: 'estadoPro',
    type: String,
    description: 'Estado del producto',
  })
  @UseGuards(PermisoAccessGuard)
  @SetMetadata('permiso', 'VISUALIZAR')
  async getProductsByEstado(@Query('estadoPro') estado: string) {
    return this.productosService.getProductosAct(estado);
  }

  @Get('stock/:id')
  @ApiOperation({ summary: 'Obtiene el stock de un producto por su ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID del producto',
  })
  @UseGuards(PermisoAccessGuard)
  @SetMetadata('permiso', 'VISUALIZAR')
  async getStockProducto(@Param('id') id: number) {
    return this.productosService.getStrockProduc(id);
  }

  @Get('totalPCategoria')
  @ApiOperation({ summary: 'Obtiene el total de productos por categoría' })
  @UseGuards(PermisoAccessGuard)
  @SetMetadata('permiso', 'VISUALIZAR')
  async getTotalProduCategoria() {
    return this.productosService.getCantidadProductosByCategoria();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtiene un producto por su ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID del producto',
  })
  @UseGuards(PermisoAccessGuard)
  @SetMetadata('permiso', 'VISUALIZAR')
  async getOneProduct(@Param('id') id: number) {
    return this.productosService.getOneProducts(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crea un nuevo producto' })
  @ApiBody({
    type: CreateProductosDto,
    description: 'Dto para crear un producto',
  })
  @UseGuards(PermisoAccessGuard)
  @SetMetadata('permiso', 'CREAR')
  async createProduct(@Body() createProductDto: CreateProductosDto) {
    const newProduct =
      await this.productosService.createProducts(createProductDto);
    if (newProduct.success) {
      return { message: 'Producto creado con éxito', newProduct };
    } else {
      return { message: newProduct.message };
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualiza un producto por su ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID del producto',
  })
  @ApiBody({
    type: UpdateProductDto,
    description: 'Dto para actualizar un producto',
  })
  @UseGuards(PermisoAccessGuard)
  @SetMetadata('permiso', 'EDITAR')
  async updateProduct(
    @Param('id') id: number,
    @Body() updateProductosDto: UpdateProductDto,
  ) {
    const updateProduct = await this.productosService.updateProducts(
      id,
      updateProductosDto,
    );
    if (updateProduct.success) {
      return {
        message: 'El producto ha sido actualizado con éxito',
        updateProduct,
      };
    } else {
      return { message: updateProduct.message };
    }
  }

  @Patch(':id/estado')
  @ApiOperation({ summary: 'Actualiza el estado de un producto' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID del producto',
  })
  @ApiBody({
    type: UpdateProductDto,
    description: 'Dto para actualizar el estado de un producto',
  })
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
      return { message: updateResult.message };
    }
  }
}
