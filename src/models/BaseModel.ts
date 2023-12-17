import redis from '@/database/redis';
import { prop } from '@typegoose/typegoose';
import { ObjectId } from 'mongoose';
import { Entity, Repository, Schema } from 'redis-om';

export class BaseModel {
  private name: string;

  @prop()
  public readonly _id?: ObjectId;

  @prop({ default: () => new Date() })
  public createdAt?: Date;

  @prop({ default: () => new Date() })
  public updatedAt?: Date;

  constructor(name: string) {
    this.name = name;
  }

  public static saveToRedis<T extends Entity>(data: T) {
    const schemaa = new Schema(this.name, {});
    const repo = new Repository(schemaa, redis.getClient());
    return repo.save(data);
  }

  public static async getFromRedis(id: string) {
    const schemaa = new Schema(this.name, {});
    const repo = new Repository(schemaa, redis.getClient());
    return repo.fetch(id);
  }
}
