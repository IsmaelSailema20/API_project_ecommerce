import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DetalleNotasDeCreditoEntity } from 'src/detalle_notas_de_credito/entities/detalle_notas_de_credito.entity';
import { Factura } from 'src/facturas/entities/facturas.entity';
import { UserEntity } from 'src/user/entities';
import { Repository } from 'typeorm';
import { CreateNotasDeCreditoDto } from './dtos/create-notas_de_credito.dto';
import { NotasDeCreditoEntity } from './entities/notas_de_credito.entity';
import { ProductosEntity } from 'src/productos/entities/productos.entity';
import { UpdateNotasDeCreditoDto } from './dtos/update-notas_de_credito.dto copy';

@Injectable()
export class NotasDeCreditoService {
  constructor(
    @InjectRepository(Factura)
    private readonly facturasRepository: Repository<Factura>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(DetalleNotasDeCreditoEntity)
    private readonly detalleNotasDeCreditoRepository: Repository<DetalleNotasDeCreditoEntity>,
    @InjectRepository(NotasDeCreditoEntity)
    private readonly notasDecreditoRepository: Repository<NotasDeCreditoEntity>,
    @InjectRepository(ProductosEntity)
    private readonly productosRepository: Repository<ProductosEntity>,
  ) {}

  async createNotasDeCredito(
    createNotaDeCredito: CreateNotasDeCreditoDto,
  ): Promise<NotasDeCreditoEntity> {
    const {
      detallesNotaDeCredito,
      id_user,
      id_factura,
      ...notasDeCreditoData
    } = createNotaDeCredito;

    // Encontrar el usuario
    const user = await this.userRepository.findOne({
      where: { id_usuario: id_user },
    });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    // Encontrar la factura
    const factura = await this.facturasRepository.findOne({
      where: { id_factura },
      relations: ['detallesFactura', 'detallesFactura.producto'],
    });

    if (!factura) {
      throw new NotFoundException('Factura no encontrada');
    }

    // Crear la nota de crédito
    const notaDeCredito = this.notasDecreditoRepository.create({
      ...notasDeCreditoData,
      usuario: user,
      factura: factura,
    });

    await this.notasDecreditoRepository.save(notaDeCredito);

    const detalleNotasDeCreditos = await Promise.all(
      detallesNotaDeCredito.map(async (detalleDto) => {
        // Verificar que el producto pertenece a la factura
        const productoEnFactura = factura.detallesFactura.find(
          (detalle) =>
            detalle.producto &&
            detalle.producto.id_producto === detalleDto.id_producto,
        );

        if (!productoEnFactura) {
          throw new NotFoundException(
            `El producto con id ${detalleDto.id_producto} no pertenece a la factura especificada`,
          );
        }

        // Actualizar el stock del producto
        const producto = productoEnFactura.producto;
        producto.stock += detalleDto.cantidad;
        await this.productosRepository.save(producto);

        // Crear el detalle de la nota de crédito
        const detalleNotaDeCredito =
          this.detalleNotasDeCreditoRepository.create({
            ...detalleDto,
            producto: productoEnFactura.producto,
            notaDeCredito,
          });

        return this.detalleNotasDeCreditoRepository.save(detalleNotaDeCredito);
      }),
    );

    notaDeCredito.detallesNotaDeCredito = detalleNotasDeCreditos;

    return this.notasDecreditoRepository.save(notaDeCredito);
  }
  async getAllNotasDeCredito() {
    const notasDeCredito = await this.notasDecreditoRepository.find({
      relations: [
        'usuario',
        'factura',
        'detallesNotaDeCredito',
        'detallesNotaDeCredito.producto',
      ],
    });
    return { notasDeCredito };
  }

  async getNotaDeCreditoById(id_nota_credito: number) {
    const notaDeCredito = await this.notasDecreditoRepository.findOne({
      where: { id_nota_credito },
      relations: [
        'usuario',
        'factura',
        'detallesNotaDeCredito',
        'detallesNotaDeCredito.producto',
      ],
    });

    if (!notaDeCredito) {
      return { success: false, message: 'Nota de crédito no encontrada' };
    }

    return {
      success: true,
      message: 'Nota de crédito obtenida exitosamente',
      data: notaDeCredito,
    };
  }

  async updateEstadoNotaDeCredito(
    id: number,
    updateEstadoDto: UpdateNotasDeCreditoDto,
  ) {
    const notaDeCredito = await this.getNotaDeCreditoById(id);

    notaDeCredito.data.estado = updateEstadoDto.estado;
    await this.notasDecreditoRepository.save(notaDeCredito.data);

    return {
      success: true,
      message: 'Estado de la nota de crédito actualizado exitosamente',
      data: notaDeCredito,
    };
  }
}
