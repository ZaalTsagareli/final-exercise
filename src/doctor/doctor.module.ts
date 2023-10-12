import { Module } from '@nestjs/common';
import { DoctorController } from './doctor.controller';
import { DoctorLibModule } from '@app/doctor-lib';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorEntity } from 'libs/entities/doctor.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [DoctorLibModule],
  controllers: [DoctorController],
})
export class DoctorModule {}
