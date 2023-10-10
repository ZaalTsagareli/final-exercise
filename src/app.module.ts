import { Module } from '@nestjs/common';
import { DoctorModule } from './doctor/doctor.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getDatabaseConfig } from 'libs/database';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DoctorModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getDatabaseConfig,
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
