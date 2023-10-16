import { PassportStrategy } from '@nestjs/passport';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtSecret } from 'libs/constants';
import { JwtPayloadInterface } from '@app/common/interfaces/jwt.payload';
import { PatientLibService } from '@app/patient-lib';

@Injectable()
export class AccessTokenPatientStrategy extends PassportStrategy(
  Strategy,
  'jwt-patient',
) {
  public constructor(private readonly patientService: PatientLibService) {
    super({
      secretOrKey: JwtSecret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }
  async validate(payload: JwtPayloadInterface) {
    if (payload.user == 'doctor') {
      throw new UnauthorizedException('permissions denied');
    }
    const patient = await this.patientService.getUserById(
      parseInt(payload.id.toString()),
    );

    if (!patient) throw new UnauthorizedException();

    const { password, ...rest } = patient;
    return rest;
  }
}
