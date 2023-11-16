import { User } from '../../../entities/user.entity';

export type AuthResponseDto = {
  token: string,
  me: User
}
