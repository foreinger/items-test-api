import { Repository } from 'typeorm';
import { MessageEntity } from '../../entities/message.entity';

export function allKeys<T>(repository: Repository<T>): (keyof T)[] {
  return repository.metadata.columns.map((c) => c.propertyName as keyof MessageEntity) as (keyof T)[];
}
