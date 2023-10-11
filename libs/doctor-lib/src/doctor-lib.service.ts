import { Injectable } from '@nestjs/common';
import { doctorRepository } from 'libs/repositories';

@Injectable()
export class DoctorLibService {
  constructor(private readonly doctorRepository: doctorRepository) {}
  public async signUp() {}

  public async update() {}

  public async login() {}
}
