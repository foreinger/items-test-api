import { HttpStatus, Injectable } from '@nestjs/common';
import { Not, Repository } from 'typeorm';
import { UserEntity } from '../../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RegistrationFormDto } from '../auth/dto/registration-form-dto';
import * as bcrypt from 'bcrypt';
import { CustomHttpException, ValidationError } from '../../core/models/custom-http-exception.model';
import { ErrorTypes } from '../../core/enums/error-types.enum';
import { ID } from '../../core/types/alias.types';
import { PaginationDto } from '../../core/dto/pagination.dto';
import { PaginationParamsDto } from '../../core/dto/pagination-params.dto';
import { UserDto } from './dto/user.dto';
import { ResponseDto } from '../../core/dto/response.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  public async createUser(dto: RegistrationFormDto): Promise<UserEntity> {
    const user = await this.findOneByUsername(dto.username);

    if (user) {
      const validation: ValidationError[] = [{ property: 'username', errorType: ErrorTypes.userAlreadyExist }];
      throw new CustomHttpException(ErrorTypes.invalidData, HttpStatus.CONFLICT, { validation });
    }

    dto.password = await bcrypt.hash(dto.password, 10);

    return this.userRepository.save(dto);
  }

  public findOneByUsername(username: string): Promise<UserEntity> {
    return this.userRepository.findOne({
      where: { username },
      select: {
        id: true,
        username: true,
        password: true,
      },
    });
  }

  public async findMeById(id: ID): Promise<ResponseDto<UserEntity>> {
    const user = await this.userRepository.findOneBy({ id });
    return new ResponseDto(user);
  }

  public async findAll(dto: PaginationParamsDto, myID: ID): Promise<PaginationDto<UserDto>> {
    const [data, total] = await this.userRepository.findAndCount({
      where: { id: Not(myID) },
      order: { id: 'ASC' },
      skip: dto.pageIndex * dto.pageSize,
      take: dto.pageSize,
    });

    return new PaginationDto<UserDto>({ data, total, ...dto });
  }
}
