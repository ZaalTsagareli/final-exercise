import { Module } from '@nestjs/common';
import { OffersLibService } from './offers-lib.service';

@Module({
  providers: [OffersLibService],
  exports: [OffersLibService],
})
export class OffersLibModule {}
