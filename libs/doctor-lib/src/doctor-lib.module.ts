import { Module } from '@nestjs/common';
import { DoctorLibService } from './doctor-lib.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountryRepository, DoctorRepository } from 'libs/repositories-lib';
import { JwtModule } from '@nestjs/jwt';
import { CommonModule } from '@app/common';
import { JwtSecret } from 'libs/constants';
import { RedisLibModule } from '@app/redis-lib';
import {
  CountryEntity,
  DoctorEntity,
  DoctorTypesEntity,
} from 'libs/database/entities';
import { DoctorTypeRepository } from 'libs/repositories-lib/doctor-type.repository';
import { RepositoriesModule } from 'libs/repositories-lib/repositories.module';

@Module({
  imports: [
    CommonModule,
    RedisLibModule,
    RepositoriesModule,
    JwtModule.register({
      secret: JwtSecret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [DoctorLibService],
  exports: [DoctorLibService],
})
export class DoctorLibModule {}
