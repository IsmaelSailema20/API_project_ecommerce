import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PromocionesEntity } from './entities/promociones.entity';
import { Repository } from 'typeorm';
import { CreatePromocionesDto } from './dtos/create-promociones.dto';
import { UpdatePromocionesDto } from './dtos/update-promociones.dto';

@Injectable()
export class PromocionesService {
  constructor(
    @InjectRepository(PromocionesEntity)
    private readonly promocionesRepository: Repository<PromocionesEntity>,
  ) {}

  async create(promocionDTO: CreatePromocionesDto) {
    const promocion = this.promocionesRepository.create(promocionDTO);
    const savedPromocion = await this.promocionesRepository.save(promocion);
    return {
      message: 'Promoción creada con éxito',
      data: savedPromocion,
    };
  }

  async findAll(): Promise<PromocionesEntity[]> {
    return this.promocionesRepository.find();
  }

  async findOne(id: number): Promise<PromocionesEntity> {
    const promocion = await this.promocionesRepository.findOne({
      where: { id_promocion: id },
    });
    if (!promocion) {
      throw new NotFoundException(`Promoción con ID ${id} no encontrada`);
    }
    return promocion;
  }

  async update(
    id: number,
    updatePromocionDTO: UpdatePromocionesDto,
  ): Promise<{ message: string; data: PromocionesEntity }> {
    const promocion = await this.findOne(id);

    if (updatePromocionDTO.descripcion) {
      const existingPromocion = await this.promocionesRepository.findOne({
        where: { descripcion: updatePromocionDTO.descripcion },
      });
      if (existingPromocion && existingPromocion.id_promocion !== id) {
        throw new BadRequestException(
          'Ya existe una promoción con la misma descripción',
        );
      }
    }

    Object.assign(promocion, updatePromocionDTO);
    const promocionActualizada =
      await this.promocionesRepository.save(promocion);
    return {
      message: 'Promoción actualizada con éxito',
      data: promocionActualizada,
    };
  }
}
