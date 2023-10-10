import { Module } from '@nestjs/common';
import { DoctorController } from './doctor.controller';
import { DoctorLibModule } from '@app/doctor-lib';

@Module({
  imports: [DoctorLibModule],
  controllers: [DoctorController],
})
export class DoctorModule {}
