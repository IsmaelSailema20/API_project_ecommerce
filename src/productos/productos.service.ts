import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductosEntity } from './entities/productos.entity';
import { Repository } from 'typeorm';
import { CreateProductosDto } from './dtos/create-productos.dto';
import { MarcasEntity } from 'src/marcas/entities/marcas.entity';
import { CategoriasEntity } from 'src/categorias/entities/categorias.entity';
import { UpdateProductDto } from './dtos/update-product.dto';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(ProductosEntity)
    private readonly productosRepository: Repository<ProductosEntity>,
    @InjectRepository(MarcasEntity)
    private readonly marcasRepository: Repository<MarcasEntity>,
    @InjectRepository(CategoriasEntity)
    private readonly categoriasRepository: Repository<CategoriasEntity>,
  ) {}

  async getAllProducts() {
    const productos = await this.productosRepository.find({
      relations: ['marca', 'categoria'],
    });
    return { productos };
  }

  async getOneProducts(id: number) {
    const producto = await this.productosRepository.findOne({
      where: { id_producto: id },
      relations: ['marca', 'categoria'],
    });
    if (!producto) {
      throw new NotFoundException('Producto no encontrado');
    }
    return producto;
  }

  async createProducts(createProducto: CreateProductosDto) {
    const { id_marca, id_categoria, ...informacionProducto } = createProducto;
    const productoExiste = await this.productosRepository.findOne({
      where: { nombre: createProducto.nombre },
    });
    const marcaExistente = await this.marcasRepository.findOneBy({ id_marca });
    const categoriaExistente = await this.categoriasRepository.findOneBy({
      id_categoria,
    });
    if (productoExiste) {
      return {
        success: false,
        message: `El producto con el nombre ${(await productoExiste).nombre} ya existe`,
      };
    }
    if (!marcaExistente)
      throw new NotFoundException('La marca no existe en los registros');
    if (!categoriaExistente) {
      throw new NotFoundException('La categoria no existe en los registros');
    }
    const producto = new ProductosEntity();
    Object.assign(producto, informacionProducto);
    producto.marca = marcaExistente;
    producto.categoria = categoriaExistente;
    const newProducto = this.productosRepository.save(producto);
    return { success: true, data: newProducto };
  }

  async updateProducts(id: number, updateProductosDto: UpdateProductDto) {
    const producto = await this.getOneProducts(id);
    const { nombre, id_marca, id_categoria } = updateProductosDto;

    // Verifica si el campo `nombre` está presente
    if (nombre) {
      const productoExiste = await this.productosRepository.findOne({
        where: { nombre: nombre },
      });
      if (productoExiste && productoExiste.id_producto !== id) {
        return {
          success: false,
          message: `El producto con el nombre '${nombre}' ya existe`,
        };
      }
    }

    const marcaExistente = await this.marcasRepository.findOneBy({ id_marca });
    const categoriaExistente = await this.categoriasRepository.findOneBy({
      id_categoria,
    });

    if (!marcaExistente)
      throw new NotFoundException('La marca no existe en los registros');
    if (!categoriaExistente) {
      throw new NotFoundException('La categoria no existe en los registros');
    }

    Object.assign(producto, updateProductosDto);
    producto.marca = marcaExistente;
    producto.categoria = categoriaExistente;

    const updateProduct = await this.productosRepository.save(producto);
    return { success: true, data: updateProduct };
  }

  async updateEstadoProducto(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.getOneProducts(id);
    product.estadoProducto = updateProductDto.estadoProducto;
    await this.productosRepository.save(product);
    return {
      success: true,
      product,
      message: `El estado del producto ha sido actualizado a '${product.estadoProducto}'.`,
    };
  }

  /*METODO PARA PODER OBTENER LOS PRODUCTOS EN ESTADO ACTIVO O DESACTIVADO */
  async getProductosAct(estado: string) {
    const producto = await this.productosRepository.find({
      where: { estadoProducto: estado },
      relations: ['marca', 'categoria'],
    });
    if (!producto) {
      throw new NotFoundException('Producto no encontrado');
    }
    return { producto };
  }

  /*METODO PARA OBTENER EL STOCK DE UN PRODUCTO EN ESPECIFICO */
  async getStrockProduc(id: number) {
    const producto = await this.getOneProducts(id);
    return {
      nombre: producto.nombre,
      stock: producto.stock,
    };
  }

  /*CONSULTAR EL NUMERO DE PRODUCTOS EXISTENTES POR CATEGORIA*/
  async getCantidadProductosByCategoria() {
    const queryBuilder = this.productosRepository
      .createQueryBuilder('producto')
      .select('categoria.nombre', 'categoria')
      .addSelect('COUNT(*)', 'cantidad')
      .innerJoin('producto.categoria', 'categoria')
      .groupBy('categoria.nombre');

    const result = await queryBuilder.getRawMany();
    return result;
  }
}
