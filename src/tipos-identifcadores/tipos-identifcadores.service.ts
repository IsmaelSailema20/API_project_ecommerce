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
    const tipoIdentf = createTipoIdentif;

    //Verifica si el identificador ya existe a travez del nombre
    let tipoIdentfExist = await this.tiposIdentifRepository.findOne({
      where: { nombre: tipoIdentf.nombre },
    });

    if (!tipoIdentfExist) {
      const newTipoIndentf = this.tiposIdentifRepository.create(tipoIdentf);
      tipoIdentfExist = await this.tiposIdentifRepository.save(newTipoIndentf);
    }
    return tipoIdentfExist;
  }

  async updateTipoIdentif(
    id: number,
    updateTipoIdentifDto: UpdateTipoIdentfDto,
  ) {
    //CONTROLAR QUE EL ID NO SE PUEDA MODFICAR?
    const tipoIdentf = await this.getOneTiposIdentificadores(id);
    Object.assign(tipoIdentf, updateTipoIdentifDto);
    return await this.tiposIdentifRepository.save(tipoIdentf);
  }
}
