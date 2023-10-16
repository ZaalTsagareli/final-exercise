import { Module } from '@nestjs/common';
import { ConsultationLibService } from './consultation-lib.service';
import { RepositoriesModule } from 'libs/repositories-lib';

@Module({
  imports: [RepositoriesModule],
  providers: [ConsultationLibService],
  exports: [ConsultationLibService],
})
export class ConsultationLibModule {}
