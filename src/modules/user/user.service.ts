import { HttpStatus, Injectable } from '@nestjs/common';
import { Not, Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RegistrationDto } from '../auth/dto/registration.dto';
import * as bcrypt from 'bcrypt';
import { CustomHttpException } from '../../core/models/error.models';
import { AuthErrors } from '../auth/enums/auth.enums';
import { Pagination, PaginationParams } from '../../core/models/pagination.models';
import { PaginationParamsDto } from '../../core/dto/pagination.dto';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {
  }

  public async createUser(dto: RegistrationDto): Promise<User> {
    const user = await this.findOne(dto.username);

    if (user) {
      throw new CustomHttpException({ errorType: AuthErrors.userAlreadyExist }, HttpStatus.CONFLICT);
    }

    dto.password = await bcrypt.hash(dto.password, 10);

    return this.userRepository.save(dto);
  }

  public findOne(username: string): Promise<User> {
    return this.userRepository.findOneBy({ username });
  }

  public findOneById(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  public async findAll(dto: PaginationParamsDto, myID: number): Promise<Pagination<User>> {
    const paginationParams = new PaginationParams(dto);

    const [data, total] = await this.userRepository.findAndCount({
      where: { id: Not(myID) },
      order: { id: 'ASC' },
      skip: paginationParams.pageIndex * paginationParams.pageSize,
      take: paginationParams.pageSize
    });

    return new Pagination<User>({ data, total, ...paginationParams });
  }
}
