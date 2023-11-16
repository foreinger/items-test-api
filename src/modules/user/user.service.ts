import { HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RegistrationDto } from '../auth/dto/registration.dto';
import * as bcrypt from 'bcrypt';
import { CustomHttpException } from '../../core/models/error.models';
import { AuthErrors } from '../auth/enums/auth.enums';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {
  }

  public async createUser(dto: RegistrationDto): Promise<User> {
    const user = await this.findUser(dto.username);

    if (user) {
      throw new CustomHttpException({ errorType: AuthErrors.userAlreadyExist }, HttpStatus.CONFLICT);
    }

    dto.password = await bcrypt.hash(dto.password, 10);

    return this.userRepository.save(dto);
  }

  public findUser(username: string): Promise<User> {
    return this.userRepository.findOneBy({ username });
  }
}
