import { PassportStrategy } from '@nestjs/passport';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { Injectable } from '@nestjs/common';

import { ExtractJwt, Strategy } from 'passport-jwt';
import { DoctorLibService } from '@app/doctor-lib';
import { JwtSecret } from 'libs/constants';
import { JwtPayloadInterface } from '@app/common/interfaces/jwt.payload';

@Injectable()
export class AccessTokenDoctorStrategy extends PassportStrategy(
  Strategy,
  'jwt-doctor',
) {
  public constructor(private readonly doctorService: DoctorLibService) {
    super({
      secretOrKey: JwtSecret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }
  async validate(payload: JwtPayloadInterface) {
    if (payload.user == 'patient') {
      throw new UnauthorizedException('permissions denied');
    }
    const doctor = await this.doctorService.getUserById(
      parseInt(payload.id.toString()),
    );

    if (!doctor) throw new UnauthorizedException();

    const { password, ...rest } = doctor;
    return rest;
  }
}
