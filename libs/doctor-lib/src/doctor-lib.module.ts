import { Module } from '@nestjs/common';
import { DoctorLibService } from './doctor-lib.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorEntity } from 'libs/entities/doctor.entity';
import { doctorRepository } from 'libs/repositories';
import { JwtModule } from '@nestjs/jwt';
import { CommonModule } from '@app/common';
import { JwtSecret } from 'libs/constants';

@Module({
  imports: [
    CommonModule,
    TypeOrmModule.forFeature([DoctorEntity]),
    JwtModule.register({
      secret: JwtSecret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [DoctorLibService, doctorRepository],
  exports: [DoctorLibService],
})
export class DoctorLibModule {}
