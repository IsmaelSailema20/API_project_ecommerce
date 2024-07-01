// facturas.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Factura } from './entities/facturas.entity';
import { CreateFacturaDto } from './dtos/create-facturas.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { DetalleFactura } from 'src/detalles_factura/entities/detalles_factura.entity';
import { MetodosPago } from 'src/metodos_pago/entities/metodosPago.entity';
import { ProductosEntity } from 'src/productos/entities/productos.entity';

@Injectable()
export class FacturasService {
  constructor(
    @InjectRepository(Factura)
    private readonly facturasRepository: Repository<Factura>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(DetalleFactura)
    private readonly detallesFacturaRepository: Repository<DetalleFactura>,
    @InjectRepository(MetodosPago)
    private readonly metodosPagoRepository: Repository<MetodosPago>,
    @InjectRepository(ProductosEntity)
    private readonly productosRepository: Repository<ProductosEntity>,
  ) {}
  //Crear la factura
  async create(createFacturaDto: CreateFacturaDto): Promise<Factura> {
    const {
      detallesFactura,
      id_user,
      id_metodo_pago: id_metodo_pago,
      ...facturaData
    } = createFacturaDto;

    const user = await this.userRepository.findOne({
      where: { id_usuario: id_user },
    });
    const metodoPago = await this.metodosPagoRepository.findOneBy({
      id_metodo_pago: id_metodo_pago,
    });

    const factura = this.facturasRepository.create({
      ...facturaData,
      usuario: user,
      metodoPago: metodoPago,
    });

    await this.facturasRepository.save(factura);

    const detalleFacturas = await Promise.all(
      detallesFactura.map(async (detalleDto) => {
        const producto = await this.productosRepository.findOne({
          where: { id_producto: detalleDto.id_producto },
        });
        const detalleFactura = this.detallesFacturaRepository.create({
          ...detalleDto,
          producto,
          factura,
        });
        return this.detallesFacturaRepository.save(detalleFactura);
      }),
    );

    factura.detallesFactura = detalleFacturas;

    return this.facturasRepository.save(factura);
  }

  async findAll(): Promise<Factura[]> {
    return this.facturasRepository.find({
      relations: ['usuario', 'detallesFactura'],
    });
  }

  //BUSCA LA FACTURA POR EL ID
  async findOne(id: number): Promise<Factura> {
    return this.facturasRepository.findOne({
      where: { id_factura: id },
      relations: ['usuario', 'detallesFactura'],
    });
  }

  //BUSCAR LA FACTURA POR EL NOMBRE DEL USUARIO
  async findByUserName(userName: string, apellido: string): Promise<Factura[]> {
    return this.facturasRepository
      .createQueryBuilder('factura')
      .leftJoinAndSelect('factura.usuario', 'user')
      .leftJoinAndSelect('factura.detallesFactura', 'detallesFactura')
      .where('user.firstName = :userName', { userName })
      .andWhere('user.lastName = :userLastName', { apellido })
      .getMany();
  }

  //BUSCAR FACTURA POR LA FECHA
  async findByDate(date: Date): Promise<Factura[]> {
    return this.facturasRepository.find({
      where: { fecha: date },
      relations: ['usuario', 'detallesFactura'],
    });
  }
}
