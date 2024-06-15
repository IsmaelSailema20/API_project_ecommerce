// facturas.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Factura } from './entities/facturas.entity';
import { CreateFacturaDto } from './dtos/create-facturas.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { DetalleFactura } from 'src/detalles_factura/entities/detalles_factura.entity';

@Injectable()
export class FacturasService {
  constructor(
    @InjectRepository(Factura)
    private readonly facturasRepository: Repository<Factura>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(DetalleFactura)
    private readonly detallesFacturaRepository: Repository<DetalleFactura>,
  ) {}
  //Crear la factura
  async create(createFacturaDto: CreateFacturaDto): Promise<Factura> {
    const user = await this.userRepository.findOne({
      where: { id_usuario: createFacturaDto.id_user },
    });

    const factura = this.facturasRepository.create({
      fecha: createFacturaDto.fecha,
      hora_factura: createFacturaDto.hora_factura,
      total_factura: createFacturaDto.total_factura,
      porcentaje_descuento: createFacturaDto.porcentaje_descuento,
      usuario: user,
      detallesFactura: createFacturaDto.detallesFactura,
    });
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
      where: { id: id },
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
