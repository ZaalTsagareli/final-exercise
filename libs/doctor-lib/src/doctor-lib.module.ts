import { Module } from '@nestjs/common';
import { DoctorLibService } from './doctor-lib.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorRepository } from 'libs/repositories';
import { JwtModule } from '@nestjs/jwt';
import { CommonModule } from '@app/common';
import { JwtSecret } from 'libs/constants';
import { RedisLibModule } from '@app/redis-lib';
import { DoctorEntity } from 'libs/database/entities';

@Module({
  imports: [
    CommonModule,
    RedisLibModule,
    TypeOrmModule.forFeature([DoctorEntity]),
    JwtModule.register({
      secret: JwtSecret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [DoctorLibService, DoctorRepository],
  exports: [DoctorLibService],
})
export class DoctorLibModule {}
