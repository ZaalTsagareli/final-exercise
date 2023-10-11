import { Module } from '@nestjs/common';
import { ConsultationLibService } from './consultation-lib.service';

@Module({
  providers: [ConsultationLibService],
  exports: [ConsultationLibService],
})
export class ConsultationLibModule {}
