import { Module } from '@nestjs/common';
import { DoctorController } from './doctor.controller';
import { DoctorLibModule } from '@app/doctor-lib';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorEntity } from 'libs/entities/doctor.entity';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenStrategy } from '@app/common/jwt/strategies';

@Module({
  imports: [DoctorLibModule],
  controllers: [DoctorController],
  providers: [AccessTokenStrategy],
})
export class DoctorModule {}
