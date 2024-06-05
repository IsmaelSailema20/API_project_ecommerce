import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonEntity, UserEntity } from './entities';
import { Repository } from 'typeorm';
import { RolesEntity } from 'src/roles/entities/roles.entity';
import { RolesUsuarioEntity } from 'src/roles_usuario/entities/roles_usuario.entity';
import { CreateUserDto, EditUserDto } from './dtos';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(PersonEntity)
    private readonly personRepository: Repository<PersonEntity>,
    @InjectRepository(RolesEntity)
    private readonly rolesRepository: Repository<RolesEntity>,
    @InjectRepository(RolesUsuarioEntity)
    private readonly rolesUsuarioRepository: Repository<RolesUsuarioEntity>,
  ) {}

  async getAll() {
    const users = await this.userRepository.find({
      relations: ['person'],
    });
    return { users };
  }

  async getById(id: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { id_usuario: id },
      relations: ['person'],
    });
    if (!user) throw new NotFoundException('Usuario No Encontrado');
    return user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const { person } = createUserDto;

    // Verificar si la información de la persona está incluida en el DTO
    if (!person) {
      throw new BadRequestException(
        'La información de la persona es requerida para crear un usuario.',
      );
    }

    // Verifica si el usuario ya existe
    if (
      await this.userRepository.findOne({
        where: { username: createUserDto.username },
      })
    ) {
      throw new BadRequestException('El usuario ya existe.');
    }

    // Verifica si la persona ya existe basada en la identificacion
    const personaExiste = await this.personRepository.findOne({
      where: { identificacion: person.identificacion },
    });

    // Si la persona no existe entonces se guarda el usuario
    if (!personaExiste) {
      const salt = await bcrypt.genSalt();
      createUserDto.password = await bcrypt.hash(createUserDto.password, salt);
      return await this.userRepository.save(createUserDto);
    }

    throw new BadRequestException(
      `Esta persona ya esta enlazada a otro usuario.`,
    );
  }

  async updateUser(
    id: number,
    updateUserDto: EditUserDto,
  ): Promise<UserEntity> {
    const findUser = await this.userRepository.findOne({
      where: { id_usuario: id },
      relations: ['person'],
    });

    if (!findUser) {
      throw new NotFoundException('Usuario No Encontrado');
    }

    // Verificar si la persona debe ser actualizada
    if (updateUserDto.person) {
      await this.personRepository.update(
        findUser.person.id_persona,
        updateUserDto.person,
      );
    }

    const updatedUserData = {
      ...updateUserDto,
      person: findUser.person,
    };

    await this.userRepository.update(id, updatedUserData);
    return await this.userRepository.findOne({
      where: { id_usuario: id },
      relations: ['person'],
    });
  }

  async deleteUser(id: number): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { id_usuario: id },
      relations: ['person'],
    });

    if (!user) {
      throw new NotFoundException('usuario no encontrado');
    }

    await this.userRepository.remove(user);
  }

  async getByUsername(username: string): Promise<UserEntity> {
    return await this.userRepository.findOneBy({ username });
  }
}
