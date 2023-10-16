import { Module } from '@nestjs/common';
import { DoctorController } from './doctor.controller';
import { DoctorLibModule } from '@app/doctor-lib';
import { AccessTokenDoctorStrategy } from '@app/common/jwt/strategies';

@Module({
  imports: [DoctorLibModule],
  controllers: [DoctorController],
  providers: [AccessTokenDoctorStrategy],
})
export class DoctorModule {}
