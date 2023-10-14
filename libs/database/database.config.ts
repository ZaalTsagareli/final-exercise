import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import {
  CountryEntity,
  DoctorEntity,
  DoctorTypesEntity,
} from 'libs/database/entities';

export const getDatabaseConfig = async (
  configService: ConfigService,
): Promise<TypeOrmModuleOptions> => {
  return {
    type: 'postgres',
    host: configService.get('POSTGRES_HOST'),
    port: +configService.get<number>('POSTGRES_PORT'),
    username: configService.get('POSTGRES_USER'),
    password: configService.get('POSTGRES_PASSWORD'),
    database: configService.get('POSTGRES_DB'),
    entities: [DoctorEntity, CountryEntity, DoctorTypesEntity],

    synchronize: true,
  };
};
