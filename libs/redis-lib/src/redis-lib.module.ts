import { Module } from '@nestjs/common';
import { RedisService } from './redis-lib.service';
import { RedisRepository } from './repositories';

@Module({
  providers: [RedisService, RedisRepository],
  exports: [RedisService],
})
export class RedisLibModule {}
