import { Inject, Injectable } from '@nestjs/common';
import { RedisKey, RedisValue } from 'ioredis';
import { RedisRepository } from 'libs/repositories-lib';

@Injectable()
export class RedisService {
  constructor(
    @Inject(RedisRepository) private readonly redisRepository: RedisRepository,
  ) {}

  public async get(key: RedisKey): Promise<string | null> {
    return await this.redisRepository.findOne(key);
  }

  public async set(
    key: RedisKey,
    value: RedisValue,
    expireTime?: number,
  ): Promise<void> {
    await this.redisRepository.create(key, value, expireTime);
  }

  public async update(key: RedisKey, value: RedisValue): Promise<void> {
    await this.redisRepository.update(key, value);
  }

  public async delete(key: string): Promise<number> {
    return await this.redisRepository.delete(key);
  }

  public async getTimeToLive(key: RedisKey) {
    return await this.redisRepository.getTimeToLive(key);
  }
}
