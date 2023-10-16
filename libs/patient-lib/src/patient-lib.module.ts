import { Module } from '@nestjs/common';
import { PatientLibService } from './patient-lib.service';
import { CommonModule } from '@app/common';
import { RedisLibModule } from '@app/redis-lib';
import { RepositoriesModule } from 'libs/repositories';
import { JwtModule } from '@nestjs/jwt';
import { JwtSecret } from 'libs/constants';
import { DoctorLibService } from '@app/doctor-lib';
import { ConsultationLibModule } from '@app/consultation-lib';

@Module({
  imports: [
    CommonModule,
    RedisLibModule,
    RepositoriesModule,
    ConsultationLibModule,
    JwtModule.register({
      secret: JwtSecret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [PatientLibService, DoctorLibService],
  exports: [PatientLibService, DoctorLibService],
})
export class PatientLibModule {}
