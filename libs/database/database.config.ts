import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import {
  ConsultationsEntity,
  CountryEntity,
  DoctorEntity,
  DoctorTypesEntity,
  PatientEntity,
} from 'libs/database/entities';

import * as entities from './entities/index';
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
    entities: [
      DoctorEntity,
      CountryEntity,
      DoctorTypesEntity,
      PatientEntity,
      ConsultationsEntity,
    ],

    synchronize: true,
  };
};
