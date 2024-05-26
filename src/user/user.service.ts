import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonEntity, UserEntity } from './entities';
import { Repository } from 'typeorm';
import { CreateUserDto, EditUserDto } from './dtos';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(PersonEntity)
    private readonly personRepository: Repository<PersonEntity>,
  ) {}

  async getAllUsers() {
    const users = await this.userRepository.find({
      relations: ['person'],
    });
    return { users };
  }

  async getOneUser(id: number): Promise<UserEntity> {
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

    // Verificar si la persona ya existe basada en el correo
    let savedPerson = await this.personRepository.findOne({
      where: { identificacion: person.identificacion },
    });
    if (!savedPerson) {
      const newPerson = this.personRepository.create(person);
      savedPerson = await this.personRepository.save(newPerson);
    }

    // Crear el usuario con la persona existente o recién creada
    const user = this.userRepository.create({
      ...createUserDto,
      person: savedPerson,
    });
    return await this.userRepository.save(user);
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
}
