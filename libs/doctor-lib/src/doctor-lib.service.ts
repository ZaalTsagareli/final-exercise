import { CryptoService } from '@app/common/crypto';
import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DoctorRepository } from 'libs/repositories';
import { CreateDoctorDto, LoginUserDto } from './dtos';
import { DoctorEntity } from 'libs/entities';

@Injectable()
export class DoctorLibService {
  constructor(
    private readonly doctorRepository: DoctorRepository,
    private jwtService: JwtService,
    private readonly cryptoService: CryptoService,
  ) {}
  public async signUp(doctor: CreateDoctorDto): Promise<DoctorEntity> {
    try {
      const userExsists = await this.doctorRepository.findOneByEmail(
        doctor.email,
      );
      if (userExsists) throw new ConflictException('user already exsists');

      doctor.password = await this.cryptoService.hashPassword(doctor.password);

      const databaseDoctorObject = this.doctorRepository.create(doctor);

      return await this.doctorRepository.save(databaseDoctorObject);
    } catch (err) {
      throw err;
    }
  }

  public async update() {}

  public async getUserById(id: number): Promise<DoctorEntity> {
    try {
      console.log('aqvar vcdiadsajfnsadjasfnjsafn');
      return await this.doctorRepository.findOneById(id);
    } catch (err) {
      throw err;
    }
  }
  public async validate(user: LoginUserDto) {
    try {
      const usrExsists = await this.doctorRepository.findOneByEmail(user.email);

      const passwordIsCorrect = await this.cryptoService.comparePassword(
        user.password,
        usrExsists.password,
      );

      if (usrExsists && passwordIsCorrect) {
        const payload = {
          email: user.email,
          id: usrExsists.id,
          number: usrExsists.phoneNumber,
        };

        return {
          access_token: this.jwtService.sign(payload),
        };
      }
      throw new ConflictException('user creditionals are wrong');
    } catch (err) {
      throw err;
    }
  }
}
