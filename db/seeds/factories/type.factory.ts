import { setSeederFactory } from 'typeorm-extension';
import { TypeEntity } from '../../../src/entities/type.entity';

export default setSeederFactory(TypeEntity, (faker) => {
  const type = new TypeEntity();
  type.name = faker.word.words({ count: { min: 1, max: 2 } });
  return type;
});
