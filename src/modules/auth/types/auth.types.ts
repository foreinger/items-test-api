import { User } from '../../../entities/user.entity';

export type AuthResponse = {
  token: string,
  me: User
}

export type TokenPayload = {
  sub: number;
  username: string;
}
