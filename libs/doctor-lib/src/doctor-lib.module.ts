import { Module } from '@nestjs/common';
import { DoctorLibService } from './doctor-lib.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorEntity } from 'libs/entities/doctor.entity';
import { doctorRepository } from 'libs/repositories';

@Module({
  imports: [TypeOrmModule.forFeature([DoctorEntity])],
  providers: [DoctorLibService, doctorRepository],
  exports: [DoctorLibService],
})
export class DoctorLibModule {}
