import { FindManyOptions, Repository } from 'typeorm';

export abstract class BaseRepository<T> {
  constructor(private readonly repository: Repository<T>) {}

  public async find(options: FindManyOptions<T>): Promise<T[]> {
    return this.repository.find(options);
  }
  public async save(item: T): Promise<T> {
    return await this.repository.save(item);
  }
  public async remove(item: T): Promise<T> {
    return await this.repository.remove(item);
  }
}
