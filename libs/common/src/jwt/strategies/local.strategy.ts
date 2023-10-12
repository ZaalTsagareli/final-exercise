import { PassportStrategy } from '@nestjs/passport';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { Injectable } from '@nestjs/common';

import { ExtractJwt, Strategy } from 'passport-jwt';
import { DoctorLibService } from '@app/doctor-lib';
import { JwtSecret } from 'libs/constants';
import { JwtPayloadInterface } from '@app/common/interfaces/jwt.payload';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  public constructor(private readonly doctorService: DoctorLibService) {
    super({
      secretOrKey: JwtSecret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }
  async validate(payload: JwtPayloadInterface) {
    console.log(payload, 'xddddddddddddddd');
    const user = await this.doctorService.getUserById(
      parseInt(payload.id.toString()),
    );

    if (!user || !user.verified) throw new UnauthorizedException();

    const { password, ...rest } = user;

    return rest;
  }
}
