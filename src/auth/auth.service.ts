import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthPayloadDTO } from 'src/auth/dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser({ username, password }: AuthPayloadDTO) {
    const findUser = await this.userService.getByUsername(username);
    if (!findUser) {
      throw new UnauthorizedException('Credenciales invalidas');
    }

    const isMatch = await bcrypt.compare(password, findUser.password);
    if (!isMatch) {
      throw new UnauthorizedException('Credenciales invalidas');
    }

    // Creamos el payload sin incluir la contraseña y detalles personales
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: ps, person, ...payload } = findUser;

    // Retornamos el token JWT firmado
    return this.jwtService.sign(payload);
  }
}
