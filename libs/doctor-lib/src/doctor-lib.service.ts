import { CryptoService } from '@app/common/crypto';
import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DoctorRepository } from 'libs/repositories';
import { CreateDoctorDto, LoginUserDto } from './dtos';
import { DoctorEntity } from 'libs/database/entities';
import { MailService } from '@app/common/mail/mail.service';
import { RedisService } from '@app/redis-lib';
import { OtpDto } from './dtos/otp.dto';

@Injectable()
export class DoctorLibService {
  constructor(
    private readonly doctorRepository: DoctorRepository,
    private jwtService: JwtService,
    private readonly cryptoService: CryptoService,
    private readonly mailService: MailService,
    private readonly redisService: RedisService,
  ) {}
  public async signUp(doctor: CreateDoctorDto): Promise<Object> {
    try {
      const userExsists = await this.doctorRepository.findOneByEmail(
        doctor.email,
      );
      if (userExsists) throw new ConflictException('user already exsists');

      doctor.password = await this.cryptoService.hashPassword(doctor.password);

      const otp = this.cryptoService.generateOtpVerificationCode();

      await this.mailService.sendEmail(
        doctor.email,
        'otp verification code',
        `otp : ${otp} \n note u have only 5 minutes to verife.`,
      );
      await this.redisService.set(otp.toString(), JSON.stringify(doctor));

      return { success: true, message: 'otp verification code send to mail' };
    } catch (err) {
      throw err;
    }
  }

  public async verifeDoctor(data: OtpDto): Promise<DoctorEntity> {
    try {
      const otpExsists: CreateDoctorDto = JSON.parse(
        await this.redisService.get(data.otp.toString()),
      );

      if (otpExsists) {
        const databaseObject = this.doctorRepository.create(otpExsists);
        this.redisService.delete(data.otp.toString());
        const savedDoctor = await this.doctorRepository.save(databaseObject);
        delete savedDoctor.password;
        return savedDoctor;
      }

      throw new ConflictException('otp doesnot exsists');
    } catch (err) {
      throw err;
    }
  }
  public async update() {}

  public async getUserById(id: number): Promise<DoctorEntity> {
    try {
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
