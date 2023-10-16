import { Module } from '@nestjs/common';
import { ConsultationsController } from './consultations.controller';
import { CommonModule } from '@app/common';
import { AccessTokenPatientStrategy } from '@app/common/jwt/strategies';
import { PatientLibModule } from '@app/patient-lib';
import { ConsultationLibModule } from '@app/consultation-lib';

@Module({
  imports: [CommonModule, PatientLibModule, ConsultationLibModule],
  controllers: [ConsultationsController],
  providers: [AccessTokenPatientStrategy],
})
export class ConsultationsModule {}
