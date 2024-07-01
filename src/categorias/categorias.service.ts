import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoriasEntity } from './entities/categorias.entity';
import { CreateCategoriasDto } from './dtos/create-categorias.dto';
import { UpdateCategoriasDto } from './dtos/update-categorias.dto';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectRepository(CategoriasEntity)
    private readonly categoriasRepository: Repository<CategoriasEntity>,
  ) {}

  async getAllCategorias() {
    const categorias = await this.categoriasRepository.find();
    return { categorias };
  }

  async getOneCategoria(id: number) {
    const categoriaExiste = await this.categoriasRepository.findOne({
      where: { id_categoria: id },
    });
    if (!categoriaExiste) {
      throw new NotFoundException('La categoria no existe');
    }
    return categoriaExiste;
  }

  async createCategoria(createCategoriaDto: CreateCategoriasDto) {
    const categoriaExiste = await this.categoriasRepository.findOne({
      where: { nombre: createCategoriaDto.nombre },
    });
    if (categoriaExiste) {
      return {
        success: false,
        message: `la categoria con el nombre ${(await categoriaExiste).nombre} ya existe`,
      };
    }
    const newCategoria =
      await this.categoriasRepository.save(createCategoriaDto);
    return { success: true, data: newCategoria };
  }
  async updateCategoria(id: number, updateCategoriasDto: UpdateCategoriasDto) {
    const categoria = await this.getOneCategoria(id);
    const categoriaExiste = await this.categoriasRepository.findOne({
      where: { nombre: updateCategoriasDto.nombre },
    });
    if (categoriaExiste) {
      return {
        success: false,
        message: `la categoria con el nombre ${(await categoriaExiste).nombre} ya existe`,
      };
    }

    Object.assign(categoria, updateCategoriasDto);
    const updateCategoria = await this.categoriasRepository.save(categoria);
    return { success: true, data: updateCategoria };
  }
}
