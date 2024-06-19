import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductosCarritoComprasEntity } from 'src/productos_carritos_compras/entities/productos_carrito_compras.entity';
import { UserEntity } from 'src/user/entities';
import { Repository } from 'typeorm';
import { CreateCarritoComprasDto } from './dtos/create-carrito_compras.dto';
import { CarritoComprasEntity } from './entities/carrito_compras.entity';
import { ProductosEntity } from 'src/productos/entities/productos.entity';
import { UpdateCarritoCompras } from './dtos/update-carrito_compras.dto';
import { UpdateCarritoEstadoDto } from './dtos/update-estado-carrito_compras.dto';
import { UpdateProductoCarritoDto } from './dtos/update-Cantidad-Productos-carrito.dto';

@Injectable()
export class CarritoComprasService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(ProductosCarritoComprasEntity)
    private readonly productoCarritoRepository: Repository<ProductosCarritoComprasEntity>,
    @InjectRepository(CarritoComprasEntity)
    private readonly carritoComprasRepository: Repository<CarritoComprasEntity>,
    @InjectRepository(ProductosEntity)
    private readonly productosRepository: Repository<ProductosEntity>,
  ) {}

  async createCarritoCompras(
    createCarritoCompras: CreateCarritoComprasDto,
  ): Promise<CarritoComprasEntity> {
    const { productosCarrito, id_usuario, ...carritoData } =
      createCarritoCompras;

    // Encontrar el usuario
    const user = await this.userRepository.findOne({
      where: { id_usuario: id_usuario },
    });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    // Verificar si el usuario ya tiene un carrito
    const carritoExistente = await this.carritoComprasRepository.findOne({
      where: { usuario: user },
    });

    if (carritoExistente) {
      throw new BadRequestException('El usuario ya tiene un carrito creado ');
    }

    // Crear el carrito
    const carritoCompras = this.carritoComprasRepository.create({
      ...carritoData,
      usuario: user,
    });

    await this.carritoComprasRepository.save(carritoCompras);

    const productosSet = new Set<number>();

    const productosCarritoCompras = await Promise.all(
      productosCarrito.map(async (productosCarritoDto) => {
        if (productosSet.has(productosCarritoDto.id_producto)) {
          throw new BadRequestException(
            `El producto con id ${productosCarritoDto.id_producto} ya está registrado en el carrito`,
          );
        }

        productosSet.add(productosCarritoDto.id_producto);

        const producto = await this.productosRepository.findOne({
          where: { id_producto: productosCarritoDto.id_producto },
        });

        if (!producto) {
          throw new NotFoundException(
            `Producto con id ${productosCarritoDto.id_producto} no encontrado`,
          );
        }

        if (producto.estadoProducto !== 'ACT') {
          throw new BadRequestException(
            `Producto con id ${productosCarritoDto.id_producto} no disponible`,
          );
        }

        if (productosCarritoDto.cantidad > producto.stock) {
          throw new BadRequestException(
            `Producto con id ${productosCarritoDto.id_producto} no tiene el stock suficiente`,
          );
        }

        const productoCarrito = this.productoCarritoRepository.create({
          ...productosCarritoDto,
          producto,
          carritoCompras,
        });

        return this.productoCarritoRepository.save(productoCarrito);
      }),
    );

    carritoCompras.productosCarrito = productosCarritoCompras;

    return this.carritoComprasRepository.save(carritoCompras);
  }

  async getAllCarritos() {
    const carritosCompras = await this.carritoComprasRepository.find({
      relations: ['usuario', 'productosCarrito', 'productosCarrito.producto'],
    });
    return { carritosCompras };
  }

  async getCarritoById(id_carrito_compras: number) {
    const carritosCompras = await this.carritoComprasRepository.findOne({
      where: { id_carrito: id_carrito_compras },
      relations: ['usuario', 'productosCarrito', 'productosCarrito.producto'],
    });
    return { carritosCompras };
  }

  async addProductosToCarrito(
    addProductosCarrito: UpdateCarritoCompras,
  ): Promise<CarritoComprasEntity> {
    const { productosCarrito, id_usuario } = addProductosCarrito;

    // Encontrar el usuario
    const user = await this.userRepository.findOne({
      where: { id_usuario: id_usuario },
    });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    // Encontrar el carrito del usuario
    const carritoCompras = await this.carritoComprasRepository.findOne({
      where: { usuario: user },
      relations: ['productosCarrito', 'productosCarrito.producto'],
    });

    if (!carritoCompras) {
      throw new NotFoundException('No hay un carrito para este usuario');
    }

    const productosSet = new Set<number>(
      carritoCompras.productosCarrito.map((p) => p.producto.id_producto),
    );

    const nuevosProductosCarrito = await Promise.all(
      productosCarrito.map(async (productosCarritoDto) => {
        if (productosSet.has(productosCarritoDto.id_producto)) {
          throw new BadRequestException(
            `El producto con id ${productosCarritoDto.id_producto} ya está registrado en el carrito`,
          );
        }

        productosSet.add(productosCarritoDto.id_producto);

        const producto = await this.productosRepository.findOne({
          where: { id_producto: productosCarritoDto.id_producto },
        });

        if (!producto) {
          throw new NotFoundException(
            `Producto con id ${productosCarritoDto.id_producto} no encontrado`,
          );
        }

        if (producto.estadoProducto !== 'ACT') {
          throw new BadRequestException(
            `Producto con id ${productosCarritoDto.id_producto} no disponible`,
          );
        }

        if (productosCarritoDto.cantidad > producto.stock) {
          throw new BadRequestException(
            `Producto con id ${productosCarritoDto.id_producto} no tiene el stock suficiente`,
          );
        }

        const productoCarrito = this.productoCarritoRepository.create({
          ...productosCarritoDto,
          producto: producto,
          carritoCompras: carritoCompras,
        });
        return this.productoCarritoRepository.save(productoCarrito);
      }),
    );

    carritoCompras.productosCarrito.push(...nuevosProductosCarrito);
    carritoCompras.estado = 'ACT';

    return this.carritoComprasRepository.save(carritoCompras);
  }

  // Método para actualizar el estado del carrito y eliminar productos si está desactivado
  async updateCarritoEstado(
    id_carrito: number,
    updateCarritoEstadoDto: UpdateCarritoEstadoDto,
  ): Promise<CarritoComprasEntity> {
    const { estado } = updateCarritoEstadoDto;

    // Encontrar el carrito por ID
    const carritoCompras = await this.carritoComprasRepository.findOne({
      where: { id_carrito: id_carrito },
      relations: ['productosCarrito'],
    });

    if (!carritoCompras) {
      throw new NotFoundException('Carrito no encontrado');
    }

    // Actualizar el estado del carrito
    carritoCompras.estado = estado;

    if (estado === 'DESC') {
      // Eliminar productos del carrito
      const productosCarrito = carritoCompras.productosCarrito;
      await this.productoCarritoRepository.remove(productosCarrito);
      carritoCompras.productosCarrito = [];
    }

    return this.carritoComprasRepository.save(carritoCompras);
  }

  // Método para actualizar la cantidad de productos en el carrito
  async updateProductoCantidad(
    id_carrito: number,
    updateProductoCarritoDto: UpdateProductoCarritoDto,
  ): Promise<ProductosCarritoComprasEntity> {
    const { id_producto, cantidad } = updateProductoCarritoDto;

    // Encontrar el carrito por ID
    const carritoCompras = await this.carritoComprasRepository.findOne({
      where: { id_carrito: id_carrito },
      relations: ['productosCarrito'],
    });

    if (!carritoCompras) {
      throw new NotFoundException('Carrito no encontrado');
    }

    // Encontrar el producto en el carrito
    const productoCarrito = await this.productoCarritoRepository.findOne({
      where: {
        carritoCompras: carritoCompras,
        producto: { id_producto: id_producto },
      },
      relations: ['producto', 'carritoCompras'],
    });

    if (!productoCarrito) {
      throw new NotFoundException('Producto no encontrado en el carrito');
    }
    if (updateProductoCarritoDto.cantidad > productoCarrito.producto.stock) {
      throw new BadRequestException(
        `Producto con id ${updateProductoCarritoDto.id_producto} no tiene el stock suficiente`,
      );
    }
    // Actualizar la cantidad del producto en el carrito
    productoCarrito.cantidad = cantidad;

    return this.productoCarritoRepository.save(productoCarrito);
  }
}
