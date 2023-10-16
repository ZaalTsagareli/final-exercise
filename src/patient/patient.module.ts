import { Module } from '@nestjs/common';
import { PatientController } from './patient.controller';
import { PatientLibModule } from '@app/patient-lib';
import { AccessTokenPatientStrategy } from '@app/common/jwt/strategies';

@Module({
  imports: [PatientLibModule],
  controllers: [PatientController],
  providers: [AccessTokenPatientStrategy],
})
export class PatientModule {}
