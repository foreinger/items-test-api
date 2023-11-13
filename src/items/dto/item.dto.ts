import { IsNumber, IsString } from 'class-validator';

export class CreateItemDto {
  @IsString()
  name: string;
  @IsString()
  type: string;
}


export class UpdateItemDto {
  @IsNumber()
  id: number;
  @IsString()
  name?: string;
  @IsString()
  type?: string;
}
