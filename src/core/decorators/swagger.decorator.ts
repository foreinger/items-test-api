import { applyDecorators, HttpStatus, Type } from '@nestjs/common';
import { ApiBadRequestResponse, ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { PaginationDto } from '../dto/pagination.dto';
import { ResponseDto } from '../dto/response.dto';
import { CustomHttpException, ValidationError } from '../models/custom-http-exception.model';

export const ApiPaginatedResponse = <TModel extends Type<any>>(model: TModel): any => {
  return applyDecorators(
    ApiExtraModels(PaginationDto, model),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(PaginationDto) },
          {
            properties: {
              data: {
                type: 'array',
                items: { $ref: getSchemaPath(model) },
              },
            },
          },
        ],
      },
    }),
  );
};

export const ApiObjectResponse = <TModel extends Type<any>>(model: TModel): any => {
  return applyDecorators(
    ApiExtraModels(ResponseDto, model),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(ResponseDto) },
          {
            properties: {
              data: {
                $ref: getSchemaPath(model),
              },
            },
          },
        ],
      },
    }),
  );
};

export const ApiArrayResponse = <TModel extends Type<any>>(model: TModel): any => {
  return applyDecorators(
    ApiExtraModels(ResponseDto, model),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(ResponseDto) },
          {
            properties: {
              data: {
                type: 'array',
                items: { $ref: getSchemaPath(model) },
              },
            },
          },
        ],
      },
    }),
  );
};

export const ApiErrorResponse = (statusCode: HttpStatus = HttpStatus.BAD_REQUEST): any => {
  return applyDecorators(
    ApiExtraModels(CustomHttpException, ValidationError),
    ApiBadRequestResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(CustomHttpException) },
          {
            properties: {
              statusCode: {
                type: 'number',
                default: statusCode,
              },
              validation: {
                type: 'array',
                description: 'Error lists specified for each input ot other field',
                items: { $ref: getSchemaPath(ValidationError) },
              },
            },
          },
        ],
      },
    }),
  );
};
