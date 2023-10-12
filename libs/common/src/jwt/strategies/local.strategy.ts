import { PassportStrategy } from '@nestjs/passport';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { ConfigService } from '@nestjs/config';
import { Injectable, Inject } from '@nestjs/common';

import { ExtractJwt, Strategy } from 'passport-jwt';
import { DoctorLibService } from '@app/doctor-lib';
import { JwtSecret } from 'libs/constants';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  public constructor(private readonly doctorService: DoctorLibService) {
    super({
      secretOrKey: JwtSecret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }
  async validate(payload: object) {
    const user = await this.doctorService.validate(payload['id']);

    if (!user || !user.verified) throw new UnauthorizedException();

    const { password, ...rest } = user;

    return rest;
  }
}
