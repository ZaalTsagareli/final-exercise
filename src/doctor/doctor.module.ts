import { Module } from '@nestjs/common';
import { DoctorController } from './doctor.controller';
import { DoctorLibModule } from '@app/doctor-lib';
import { AccessTokenStrategy } from '@app/common/jwt/strategies';
import { RedisLibModule } from '@app/redis-lib';

@Module({
  imports: [DoctorLibModule],
  controllers: [DoctorController],
  providers: [AccessTokenStrategy],
})
export class DoctorModule {}
