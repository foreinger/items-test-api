import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { HttpTokenData } from '../../core/decorators/token-data.decorator';
import { TokenPayload } from '../auth/types/auth.types';
import { PaginationDto } from '../../core/dto/pagination.dto';
import { PaginationParamsDto } from '../../core/dto/pagination-params.dto';
import { ApiErrorResponse, ApiObjectResponse, ApiPaginatedResponse } from '../../core/decorators/swagger.decorator';
import { UserDto } from './dto/user.dto';
import { ResponseDto } from '../../core/dto/response.dto';
import { AuthHttpGuard } from '../auth/guards/auth-http-guard.service';

@ApiBearerAuth()
@ApiTags('users')
@UseGuards(AuthHttpGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @ApiPaginatedResponse(UserDto)
  @ApiErrorResponse()
  public async getAll(@Query() dto: PaginationParamsDto, @HttpTokenData() tokenPayload: TokenPayload): Promise<PaginationDto<UserDto>> {
    return this.userService.findAll(dto, tokenPayload.sub);
  }

  @Get('me')
  @ApiObjectResponse(UserDto)
  @ApiErrorResponse()
  public async getMe(@HttpTokenData() data: TokenPayload): Promise<ResponseDto<UserDto>> {
    return this.userService.findMeById(data.sub);
  }
}
