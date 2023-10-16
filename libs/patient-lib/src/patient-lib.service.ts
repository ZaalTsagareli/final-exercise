import { MailService } from '@app/common/mail/mail.service';
import { RedisService } from '@app/redis-lib';
import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { PatientRepository } from 'libs/repositories';
import { CreatePatientDto, LoginPatientDto } from './dtos';
import { CryptoService } from '@app/common/crypto';
import { OtpDto } from '@app/doctor-lib/dtos/otp.dto';
import { DoctorEntity, PatientEntity } from 'libs/database/entities';
import { JwtService } from '@nestjs/jwt';
import { PatientRequestInterface } from '@app/common/interfaces';
import { ConsultationLibService } from '@app/consultation-lib';
import { DoctorLibService } from '@app/doctor-lib';
import { HideDoctorDto } from './dtos/hide-doctor.dto';
import { HideRepository } from 'libs/repositories/hide.repository';

@Injectable()
export class PatientLibService {
  public constructor(
    private readonly patientRepository: PatientRepository,
    private readonly redisService: RedisService,
    private readonly mailService: MailService,
    private readonly cryptoService: CryptoService,
    private readonly jwtService: JwtService,
    private readonly consultationService: ConsultationLibService,
    private readonly doctorService: DoctorLibService,
    private readonly hidesRepository: HideRepository,
  ) {}

  public async getUserById(id: number): Promise<PatientEntity> {
    return await this.patientRepository.getUserById(id);
  }
  public async signUp(data: CreatePatientDto): Promise<object> {
    try {
      const patientExsists = await this.patientRepository.findOneByEmail(
        data.email,
      );
      if (patientExsists) {
        throw new ConflictException('patient already exsists in system');
      }
      data.password = await this.cryptoService.hashPassword(data.password);
      const otp = this.cryptoService.generateOtpVerificationCode();

      await this.mailService.sendEmail(
        data.email,
        'OTP verification',
        `otp : ${otp}`,
      );
      const redisObj = {
        user: data,
        type: 'patient',
      };
      await this.redisService.set(otp.toString(), JSON.stringify(redisObj));

      return { success: true, message: 'otp verification code send to mail' };
    } catch (err) {
      throw err;
    }
  }

  public async verife(otp: OtpDto): Promise<PatientEntity> {
    try {
      const data = JSON.parse(await this.redisService.get(otp.otp.toString()));
      if (!data || data['type'] != 'patient') {
        throw new ConflictException('otp doesnot exsists in system');
      }
      const patient: CreatePatientDto = data['user'];
      const dbObject = this.patientRepository.createDatabaseObject(patient);

      const saveToDb = await this.patientRepository.save(dbObject);
      delete saveToDb.password;
      await this.redisService.delete(otp.otp.toString());

      await this.mailService.sendEmail(
        patient.email,
        'verified',
        'u have been successfully verified on our website as a patient',
      );
      return saveToDb;
    } catch (err) {
      throw err;
    }
  }

  public async validate(data: LoginPatientDto) {
    try {
      const usrExsists = await this.patientRepository.findOneByEmail(
        data.email,
      );

      if (usrExsists) {
        const passwordIsCorrect = await this.cryptoService.comparePassword(
          data.password,
          usrExsists.password,
        );
        if (passwordIsCorrect) {
          const payload = {
            email: data.email,
            id: usrExsists.id,
            user: 'patient',
          };

          return {
            access_token: this.jwtService.sign(payload),
          };
        }
      }
      throw new ConflictException('user creditionals are wrong');
    } catch (err) {
      throw err;
    }
  }

  public async getOffer(
    consultationId: number,
    auth: PatientRequestInterface,
  ): Promise<DoctorEntity[]> {
    try {
      const consultationExsists =
        await this.consultationService.consultationExsists(consultationId);
      const patient = await this.patientRepository.getUserById(auth.id);
      if (!consultationExsists && consultationExsists.patient.id == auth.id) {
        throw new BadRequestException('Wrong consultation id');
      }

      const doctors = await this.doctorService.getTheMostRelevantDoctors(
        consultationExsists,
      );
      const hideDoctors = await this.hidesRepository.find({
        where: { patient: patient },
        relations: { doctor: true },
      });
      const filteredDoctors = doctors.filter((doctor) => {
        return !hideDoctors.some(
          (hideDoctors) => hideDoctors.doctor.id === doctor.id,
        );
      });
      return filteredDoctors;
    } catch (err) {
      throw err;
    }
  }

  public async hideDoctor(data: HideDoctorDto, user: PatientRequestInterface) {
    try {
      const doctorExsists = await this.doctorService.getUserById(
        parseInt(data.doctorId),
      );
      if (!doctorExsists) throw new BadRequestException('wrong doctor id');
      const patientEntity = await this.getUserById(user.id);

      const hidesDbObject = this.hidesRepository.create(
        patientEntity,
        doctorExsists,
      );

      return await this.hidesRepository.save(hidesDbObject);
    } catch (err) {
      throw err;
    }
  }
}
