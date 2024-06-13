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
import { plainToClass } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import { GetUserDto } from './dtos/get-user-dto';

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
      relations: ['person', 'rolesUser', 'rolesUser.ID_rol'],
    });

    return users.map((user) => this.userToGetDto(user));
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
    const { id_rol, person } = createUserDto;
    // Verificar si la información de la persona está incluida en el DTO
    if (!person) {
      throw new BadRequestException(
        'La información de la persona es requerida para crear un usuario.',
      );
    }

    // Verifica si el usuario ya existe
    const userExists = await this.userRepository.findOne({
      where: { username: createUserDto.username },
    });
    if (userExists) {
      throw new BadRequestException('El usuario ya existe.');
    }

    // Verifica si la persona ya existe basada en la identificación
    const personaExiste = await this.personRepository.findOne({
      where: { identificacion: person.identificacion },
    });

    const rolExiste = await this.rolesRepository.findOneBy({ id_rol });
    if (!rolExiste) {
      throw new NotFoundException('El rol no existe en los registros');
    }

    let newUser;
    if (!personaExiste) {
      // Si la persona no existe entonces se guarda el usuario
      const salt = await bcrypt.genSalt();
      createUserDto.password = await bcrypt.hash(createUserDto.password, salt);
      createUserDto.id_rol = rolExiste.id_rol;
      newUser = await this.userRepository.save(createUserDto);
    } else {
      // Si la persona ya existe, maneja este caso como corresponda
      throw new BadRequestException('La persona ya existe.');
    }

    // Crear una instancia de la entidad RolesUsuarios
    const rolesUsuario = new RolesUsuarioEntity();
    rolesUsuario.rol = rolExiste;
    rolesUsuario.user = newUser;
    rolesUsuario.estado = 'act';

    // Guardar la relación en la tabla de rompimiento
    await this.rolesUsuarioRepository.save(rolesUsuario);

    return newUser;
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

  async getByUsername(username: string) {
    const user = await this.userRepository.findOne({
      where: { username },
      relations: ['person', 'rolesUser', 'rolesUser.rol'],
    });
    return this.userToGetDto(user);
  }

  userToGetDto(user: UserEntity): GetUserDto {
    const userDto = plainToClass(GetUserDto, user, {
      excludeExtraneousValues: true,
    });
    const roles = user.rolesUser.map((rol) => rol.rol.nombre);

    userDto.roles = roles;

    return userDto;
  }
}
