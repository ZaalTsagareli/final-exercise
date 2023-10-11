import { Module } from '@nestjs/common';
import { PatientLibService } from './patient-lib.service';

@Module({
  providers: [PatientLibService],
  exports: [PatientLibService],
})
export class PatientLibModule {}
