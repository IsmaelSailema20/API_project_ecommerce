import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTipoIdentfDto } from 'src/tipos-identifcadores/dtos/create-tipo-identf.dto';
import { UpdateTipoIdentfDto } from 'src/tipos-identifcadores/dtos/update-tipo-identf.dto';
import { TiposIdentificacionEntity } from 'src/tipos-identifcadores/entities/tipos-identificacion.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TiposIdentifcadoresService {
  constructor(
    @InjectRepository(TiposIdentificacionEntity)
    private readonly tiposIdentifRepository: Repository<TiposIdentificacionEntity>,
  ) {}

  async getAllTiposIdentificadores() {
    const tiposIdentif = await this.tiposIdentifRepository.find();
    return { tiposIdentif };
  }

  async getOneTiposIdentificadores(id: number) {
    const tipoIdentf = await this.tiposIdentifRepository.findOne({
      where: { id_tipo_identificacion: id },
    });
    if (!tipoIdentf) {
      throw new NotFoundException('Tipo Identificador no encontrado');
    }
    return tipoIdentf;
  }

  async createTipoIdentif(createTipoIdentif: CreateTipoIdentfDto) {
    //Verifica si el identificador ya existe a travez del nombre
    const tipoIdentfExist = await this.tiposIdentifRepository.findOne({
      where: { nombre: createTipoIdentif.nombre },
    });

    if (tipoIdentfExist) {
      return {
        success: false,
        message: `El tipo de identificacion con el nombre ${(await tipoIdentfExist).nombre} ya existe`,
      };
    }
    const newTipoIndentf =
      await this.tiposIdentifRepository.save(createTipoIdentif);
    return { success: true, data: newTipoIndentf };
  }

  async updateTipoIdentif(
    id: number,
    updateTipoIdentifDto: UpdateTipoIdentfDto,
  ) {
    const tipoIdentf = await this.getOneTiposIdentificadores(id);

    if (updateTipoIdentifDto.nombre) {
      const tipoIdentfExist = await this.tiposIdentifRepository.findOne({
        where: { nombre: updateTipoIdentifDto.nombre },
      });

      if (tipoIdentfExist && tipoIdentfExist.id_tipo_identificacion !== id) {
        return {
          success: false,
          message: `El tipo de identificación con el nombre ${tipoIdentfExist.nombre} ya existe`,
        };
      }
    }

    Object.assign(tipoIdentf, updateTipoIdentifDto);
    const updateTipoIdentif =
      await this.tiposIdentifRepository.save(tipoIdentf);
    return { success: true, data: updateTipoIdentif };
  }
}
