import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  private readonly redisClient: Redis;
  constructor() {
    this.redisClient = new Redis();
  }

  async addToBlacklist(token: string): Promise<void> {
    await this.redisClient.set(token, 'true', 'EX', 60 * 60 * 24 * 7);
  }

  async isBlacklisted(token: string): Promise<boolean> {
    const result = await this.redisClient.get(token);
    return result === 'true';
  }
}
