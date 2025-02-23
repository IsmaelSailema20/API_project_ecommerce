import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'somoslosmejores',
    });
  }

  validate(payload: any) {
    return {
      id_usuario: payload.id_usuario,
      username: payload.username,
      roles: payload.roles,
    };
  }
}
