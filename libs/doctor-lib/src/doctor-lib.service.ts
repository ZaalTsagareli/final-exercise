import { CryptoService } from '@app/common/crypto';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { doctorRepository } from 'libs/repositories';
import { CreateDoctorDto } from './dtos';
import { DoctorEntity } from 'libs/entities';

@Injectable()
export class DoctorLibService {
  constructor(
    private readonly doctorRepository: doctorRepository,
    private jwtService: JwtService,
    private readonly cryptoService: CryptoService,
  ) {}
  public async signUp(doctor: CreateDoctorDto): Promise<DoctorEntity> {
    const databaseDoctorObject = this.doctorRepository.create(doctor);
    return await this.doctorRepository.save(databaseDoctorObject);
  }

  public async validate(id: number): Promise<DoctorEntity> {
    return await this.doctorRepository.findOneById(id);
  }
  public async update() {}

  public async login(user: any) {
    const payload = { username: user.username, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
