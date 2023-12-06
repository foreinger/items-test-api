import { ViewColumn, ViewEntity } from 'typeorm';
import { Type } from './type.entity';


@ViewEntity({
  expression: (connection) =>
    connection
      .createQueryBuilder()
      .from(Type, 'type')
      .leftJoin('type.items', 'item')
      .select(['type.id as id', 'type.name as name', 'COUNT(item) as itemCount'])
      .groupBy('type.id')
      .orderBy({id: 'ASC'})
})

export class TypeStatistic {
  @ViewColumn()
  public id: number;

  @ViewColumn()
  public name: string;

  @ViewColumn({ name: 'itemcount' })
  public itemCount: number;
}
