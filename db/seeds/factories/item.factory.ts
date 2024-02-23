import { setSeederFactory } from 'typeorm-extension';
import { ItemEntity } from '../../../src/entities/item.entity';
import { UserEntity } from '../../../src/entities/user.entity';
import { TypeEntity } from '../../../src/entities/type.entity';

export default setSeederFactory(ItemEntity, (faker, { types, users }: { types: TypeEntity[]; users: UserEntity[] }) => {
  const item = new ItemEntity();
  item.name = faker.word.words({ count: { min: 1, max: 2 } });
  item.type = faker.helpers.arrayElement(types);
  item.createdBy = faker.helpers.arrayElement(users);
  return item;
});
