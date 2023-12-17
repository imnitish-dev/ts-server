import mongoose, { Document, Model, UpdateQuery } from 'mongoose';

export class BaseServices<M extends Document, Q> {
  constructor(protected model: Model<M>) {}

  async count(query: mongoose.FilterQuery<Q>): Promise<number>;
  async count(): Promise<number>;
  async count(query?: mongoose.FilterQuery<Q>): Promise<number> {
    if (query) {
      return this.model.countDocuments(query).exec();
    }
    return this.model.countDocuments().exec();
  }

  async getAll(filter?: mongoose.FilterQuery<Q>, { limit = 5, projection = {}, skip = 0 }: any = {}): Promise<Q[]> {
    return this.model
      .find(filter)
      .select(Object.assign({}, projection, { __v: false }) as Record<string, number | boolean | object>)
      .skip(skip as number)
      .limit(limit as number)
      .lean()
      .exec() as unknown as Q[];
  }

  async create(data: Q): Promise<Q> {
    return this.model.create(Object.assign({}, data, { _id: new mongoose.Types.ObjectId() })) as unknown as Q;
  }

  async updateOne(id: mongoose.Types.ObjectId, data: Partial<Q>, options?: mongoose.QueryOptions): Promise<Q | null> {
    return this.model
      .findByIdAndUpdate(id, data as UpdateQuery<M>, options)
      .lean()
      .exec() as Promise<Q | null>;
  }

  async deleteOne(id: mongoose.Types.ObjectId): Promise<Q | null> {
    return this.model.findByIdAndDelete(id).lean().exec() as Promise<Q | null>;
  }

  async findOne(filter: mongoose.FilterQuery<Q>, projection?: mongoose.ProjectionFields<Q>): Promise<Q | null> {
    return this.model
      .findOne(filter)
      .select(Object.assign({}, projection, { __v: false }) as Record<string, number | boolean | object>)
      .lean()
      .exec() as Promise<Q | null>;
  }

  async findOneAndUpdate(filter: mongoose.FilterQuery<Q>, data: Partial<Q>, options?: mongoose.QueryOptions): Promise<Q | null> {
    return this.model
      .findOneAndUpdate(filter, data as UpdateQuery<M>, options)
      .lean()
      .exec() as Promise<Q | null>;
  }

  async findById(id: mongoose.Types.ObjectId): Promise<Q | null> {
    return this.model.findById(id).lean().exec() as Promise<Q | null>;
  }

  async aggregate(pipeline: any[]): Promise<Q[]> {
    return this.model.aggregate(pipeline).exec() as Promise<Q[]>;
  }

  async aggregatePaginate(pipeline: any[], { limit = 5, skip = 0 }: any = {}): Promise<Q[]> {
    return this.model
      .aggregate(pipeline)
      .skip(skip as number)
      .limit(limit as number)
      .exec() as Promise<Q[]>;
  }
  async deleteMany(filter: mongoose.FilterQuery<Q>): Promise<void> {
    this.model.deleteMany(filter).lean().exec();
  }
}
