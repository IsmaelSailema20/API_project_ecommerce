import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MetodosPago } from './entities/metodosPago.entity';
import { CreateMetodosPagoDto } from './dtos/create-metodosPago.dto';
import { UserEntity } from 'src/user/entities';

@Injectable()
export class MetodosPagoService {
  constructor(
    @InjectRepository(MetodosPago)
    private readonly metodosPagoRepository: Repository<MetodosPago>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(
    createMetodosPagoDto: CreateMetodosPagoDto,
  ): Promise<MetodosPago> {
    const metodoPago = this.metodosPagoRepository.create(createMetodosPagoDto);
    return this.metodosPagoRepository.save(metodoPago);
  }

  async findAll(): Promise<MetodosPago[]> {
    return this.metodosPagoRepository.find();
  }

  async findOne(id: number): Promise<MetodosPago> {
    return this.metodosPagoRepository.findOne({
      where: { id_metodo_pago: id },
    });
  }

  async addUserToMetodoPago(
    id_metodoPago: number,
    is_user: number,
  ): Promise<void> {
    const metodoPago = await this.metodosPagoRepository.findOne({
      where: { id_metodo_pago: id_metodoPago },
      relations: ['usuarios'],
    });
    const user = await this.userRepository.findOne({
      where: { id_usuario: is_user },
    });

    if (metodoPago && user) {
      metodoPago.usuarios.push(user);
      await this.metodosPagoRepository.save(metodoPago);
    }
  }
}
