import { setSeederFactory } from 'typeorm-extension';
import { UserEntity } from '../../../src/entities/user.entity';
import * as bcrypt from 'bcrypt';

export default setSeederFactory(UserEntity, async (faker) => {
  const user = new UserEntity();
  user.username = faker.person.firstName().toLowerCase();
  user.password = await bcrypt.hash('Pa55word', 10);
  return user;
});
