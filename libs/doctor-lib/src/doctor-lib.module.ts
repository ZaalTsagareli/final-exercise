import { Module } from '@nestjs/common';
import { DoctorLibService } from './doctor-lib.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountryRepository, DoctorRepository } from 'libs/repositories';
import { JwtModule } from '@nestjs/jwt';
import { CommonModule } from '@app/common';
import { JwtSecret } from 'libs/constants';
import { RedisLibModule } from '@app/redis-lib';
import {
  CountryEntity,
  DoctorEntity,
  DoctorTypesEntity,
} from 'libs/database/entities';
import { DoctorTypeRepository } from 'libs/repositories/doctor-type.repository';

@Module({
  imports: [
    CommonModule,
    RedisLibModule,
    TypeOrmModule.forFeature([DoctorEntity, CountryEntity, DoctorTypesEntity]),
    JwtModule.register({
      secret: JwtSecret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [
    DoctorLibService,
    DoctorRepository,
    DoctorTypeRepository,
    CountryRepository,
  ],
  exports: [DoctorLibService],
})
export class DoctorLibModule {}
