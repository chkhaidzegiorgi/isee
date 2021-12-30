import { Module } from '@nestjs/common';
import { PatientsModule } from '../patients/patients.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { VisitsModule } from '../visits/visits.module';
import { DoctorsModule } from '../doctors/doctors.module';

@Module({
  imports: [
    DoctorsModule,
    PatientsModule,
    VisitsModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      url: process.env.DATABASE_URL,
      type: 'postgres',
      ssl: {
        rejectUnauthorized: false,
      },
      entities: [],
      synchronize: true, // This for development
      autoLoadEntities: true,
    }),
  ],
})
export class AppModule {}
