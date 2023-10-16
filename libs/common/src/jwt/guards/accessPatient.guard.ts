import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AccessGuardPatient extends AuthGuard('jwt-patient') {}
