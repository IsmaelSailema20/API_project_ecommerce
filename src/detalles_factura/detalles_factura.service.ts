// detalles-factura.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DetalleFactura } from './entities/detalles_factura.entity';
import { CreateDetalleFacturaDto } from './dtos/create-detalles_factura.dto';
import { Factura } from 'src/facturas/entities/facturas.entity';
import { ProductosEntity } from 'src/productos/entities/productos.entity';

@Injectable()
export class DetallesFacturaService {
  constructor(
    @InjectRepository(DetalleFactura)
    private readonly detallesFacturaRepository: Repository<DetalleFactura>,
    @InjectRepository(Factura)
    private readonly facturaRepository: Repository<Factura>,
    @InjectRepository(ProductosEntity)
    private readonly productosRepository: Repository<ProductosEntity>,
  ) {}

  async crearDetalleFactura(
    createDetalleFacturaDto: CreateDetalleFacturaDto,
  ): Promise<DetalleFactura> {
    const producto = await this.productosRepository.findOne({
      where: { id_producto: createDetalleFacturaDto.id_producto },
    });
    const factura = await this.facturaRepository.findOne({
      where: { id: createDetalleFacturaDto.id_factura },
    });

    if (!producto || !factura) {
      throw new Error('Producto o Factura no encontrados');
    }
    const detalleFactura = this.detallesFacturaRepository.create({
      ...createDetalleFacturaDto,
      producto,
    });

    return this.detallesFacturaRepository.save(detalleFactura);
  }

  async findAll(): Promise<DetalleFactura[]> {
    return this.detallesFacturaRepository.find({
      relations: ['producto', 'factura'],
    });
  }

  async findByFacturaId(facturaId: number): Promise<DetalleFactura[]> {
    return this.detallesFacturaRepository.find({
      where: { factura: { id: facturaId } },
      relations: ['producto', 'factura'],
    });
  }

  async findOne(id: number): Promise<DetalleFactura> {
    return this.detallesFacturaRepository.findOne({
      where: { id: id },
      relations: ['producto', 'factura'],
    });
  }

  async remove(id: number): Promise<void> {
    await this.detallesFacturaRepository.delete(id);
  }
}
