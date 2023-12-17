import { logger } from '@/utils/logger';
import { RedisClientType, createClient } from 'redis';

const url = process.env.REDIS_URL;

export enum TYPES {
  LIST = 'list',
  STRING = 'string',
  HASH = 'hash',
  ZSET = 'zset',
  SET = 'set',
}

class Redis {
  private client: RedisClientType;

  constructor() {
    this.client = createClient({ url }) as RedisClientType;
    this.client.connect();
    logger.info('Redis connected');
    this.client = this.client;
  }
  public getClient(): RedisClientType {
    if (!this.client) {
      logger.info('Redis new connection');
      this.client = createClient({ url });
    }
    return this.client;
  }

  public async flushAll(): Promise<void> {
    logger.info('Redis flushAll');
    await this.client.flushAll();
  }

  public async getKey(key: string): Promise<any> {
    return this.client.get(key);
  }

  public async setKey(key: string, value: string, ttl?: string): Promise<void> {
    ttl ? this.client.setEx(key, parseInt(ttl), value) : this.client.set(key, value);
  }

  public async deleteKey(key: string): Promise<void> {
    this.client.del(key);
  }

  public async getKeys(pattern: string): Promise<any> {
    return this.client.keys(pattern);
  }

  public async getKeysCount(): Promise<any> {
    return this.client.dbSize();
  }
  public async setHash(key: string, value: string, ttl?: number): Promise<void> {
    this.client.hSet(key, value, ttl);
  }
  public async getHash(key: string): Promise<any> {
    return this.client.hGetAll(key);
  }
  public async deleteHash(key: string, value: string): Promise<void> {
    this.client.hDel(key, value);
  }
  public async setList(key: string, value: string): Promise<void> {
    this.client.lPush(key, value);
  }
  public async getList(key: string): Promise<any> {
    return this.client.lRange(key, 0, -1);
  }
  public async deleteList(key: string, value: string): Promise<void> {
    this.client.lRem(key, 0, value);
  }
  /***
   * deleteZSet , getZSet, setZSet -- TODO
   */
}

export default new Redis();
