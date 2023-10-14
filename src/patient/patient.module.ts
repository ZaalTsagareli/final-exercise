import { Module } from '@nestjs/common';
import { PatientController } from './patient.controller';
import { PatientLibModule } from '@app/patient-lib';

@Module({
  controllers: [PatientController],
  providers: [PatientLibModule],
})
export class PatientModule {}
