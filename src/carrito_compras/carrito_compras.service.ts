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

    // Verificar si el usuario ya tiene un carrito activo
    const carritoExistente = await this.carritoComprasRepository.findOne({
      where: { usuario: user, estado: 'ACT' },
    });

    if (carritoExistente) {
      throw new BadRequestException('El usuario ya tiene un carrito activo');
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
      relations: ['usuario', 'productosCarrito'],
    });
    return { carritosCompras };
  }
  async getCarritoById(id_carrito_compras: number) {
    const carritosCompras = await this.carritoComprasRepository.findOne({
      where: { id_carrito: id_carrito_compras },
      relations: ['usuario', 'productosCarrito'],
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

    // Encontrar el carrito activo del usuario
    const carritoCompras = await this.carritoComprasRepository.findOne({
      where: { usuario: user, estado: 'ACT' },
      relations: ['productosCarrito', 'productosCarrito.producto'],
    });

    if (!carritoCompras) {
      throw new NotFoundException('No hay un carrito activo para este usuario');
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

        const productoCarrito = this.productoCarritoRepository.create({
          ...productosCarritoDto,
          producto: producto,
          carritoCompras: carritoCompras,
        });

        return this.productoCarritoRepository.save(productoCarrito);
      }),
    );

    carritoCompras.productosCarrito.push(...nuevosProductosCarrito);

    return this.carritoComprasRepository.save(carritoCompras);
  }
}
