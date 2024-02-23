import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ID } from '../core/types/alias.types';
import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  public id: ID;

  @CreateDateColumn({ select: false })
  @ApiProperty({ required: false })
  public created_at: string;

  @UpdateDateColumn({ select: false })
  @ApiProperty({ required: false })
  public updated_at: string;
}
