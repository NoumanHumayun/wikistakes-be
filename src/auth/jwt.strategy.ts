import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'supersecret'
    });
  }

  public async validate(token: any) {
    try {
      if (!token) {
        throw new UnauthorizedException();
      }

      const { id, email, firstName, lastName } = token;

      return { email, id, firstName, lastName };
    } catch (exception) {
      throw exception;
    }
  }
}
