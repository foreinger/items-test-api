import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';
import { SeederOptions } from 'typeorm-extension';

config();

const configService = new ConfigService();

export const dataSourceOptions: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: configService.getOrThrow('PG_HOST'),
  port: parseInt(configService.getOrThrow('PG_PORT')),
  username: configService.getOrThrow('PG_USER'),
  password: configService.getOrThrow('PG_PASSWORD'),
  database: configService.getOrThrow('PG_DB'),
  namingStrategy: new SnakeNamingStrategy(),
  entities: [__dirname + '/../src/entities/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  logging: true,
  synchronize: false,
  seeds: ['db/seeds/seeders/**/*{.ts,.js}'],
  factories: ['db/seeds/factories/**/*{.ts,.js}'],
};
const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
