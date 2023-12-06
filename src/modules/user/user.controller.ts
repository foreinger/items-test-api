import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { UserService } from './user.service';
import { Pagination } from '../../core/models/pagination.models';
import { User } from '../../entities/user.entity';
import { PaginationParamsDto } from '../../core/dto/pagination.dto';
import { HttpTokenData } from '../../core/decorators/token-data.decorator';
import { TokenPayload } from '../auth/types/auth.types';

@ApiBearerAuth()
@ApiTags('users')
@UseGuards(AuthGuard)
@Controller('users')
export class UserController {

  constructor(
    private userService: UserService
  ) {
  }

  @Get()
  @ApiOkResponse({ type: Pagination<User> })
  public async getAll(@Query() dto: PaginationParamsDto, @HttpTokenData() tokenPayload: TokenPayload): Promise<Pagination<User>> {
    return this.userService.findAll(dto, tokenPayload.sub);
  }

  @Get('me')
  @ApiOkResponse({ type: User })
  public async getMe(@HttpTokenData() data: TokenPayload): Promise<User> {
    return this.userService.findOneById(data.sub);
  }
}
