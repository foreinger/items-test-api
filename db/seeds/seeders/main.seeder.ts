import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { ItemEntity } from '../../../src/entities/item.entity';
import { TypeEntity } from '../../../src/entities/type.entity';
import { UserEntity } from '../../../src/entities/user.entity';

export class MainSeeder implements Seeder {
  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
    await dataSource.query('TRUNCATE "items" RESTART IDENTITY CASCADE;');
    await dataSource.query('TRUNCATE "types" RESTART IDENTITY CASCADE;');
    await dataSource.query('TRUNCATE "users" RESTART IDENTITY CASCADE;');

    const userFactory = factoryManager.get(UserEntity);
    const typesFactory = factoryManager.get(TypeEntity);
    const itemFactory = factoryManager.get(ItemEntity);

    await userFactory.save({ username: 'alex' });
    const users = await userFactory.saveMany(10);
    const types = await typesFactory.saveMany(15);

    itemFactory.setMeta({ users, types });
    await itemFactory.saveMany(50);
  }
}
