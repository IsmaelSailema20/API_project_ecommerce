import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MarcasEntity } from './entities/marcas.entity';
import { Repository } from 'typeorm';
import { CreateMarcasDto } from './dtos/create-marcas.dto';
import { UpdateMarcasDto } from './dtos/update-marcas.dto';

@Injectable()
export class MarcasService {
  constructor(
    @InjectRepository(MarcasEntity)
    private readonly marcasRepository: Repository<MarcasEntity>,
  ) {}

  async getAllMarcas() {
    const marcas = await this.marcasRepository.find();
    return { marcas };
  }

  async getOneMarca(id: number) {
    const marcaExiste = await this.marcasRepository.findOne({
      where: { id_marca: id },
    });
    if (!marcaExiste) {
      throw new NotFoundException('La marca no existe');
    }
    return marcaExiste;
  }

  async createMarca(createMarcaDto: CreateMarcasDto) {
    const marcaExiste = await this.marcasRepository.findOne({
      where: { nombre: createMarcaDto.nombre },
    });
    if (marcaExiste) {
      return {
        success: false,
        message: `la marca con el nombre ${(await marcaExiste).nombre} ya existe`,
      };
    }
    const newMarca = await this.marcasRepository.save(createMarcaDto);
    return { success: true, data: newMarca };
  }

  async updateMarca(id: number, updateMarcaDto: UpdateMarcasDto) {
    const marca = await this.getOneMarca(id);
    const marcaExiste = await this.marcasRepository.findOne({
      where: { nombre: updateMarcaDto.nombre },
    });
    if (marcaExiste) {
      return {
        success: false,
        message: `la marca con el nombre ${(await marcaExiste).nombre} ya existe`,
      };
    }

    Object.assign(marca, updateMarcaDto);
    const updateMarca = await this.marcasRepository.save(marca);
    return { success: true, data: updateMarca };
  }
}
