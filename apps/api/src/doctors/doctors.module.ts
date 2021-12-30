import { Module } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { DoctorsController } from './doctors.controller';
import { DoctorEntity } from '../entities/doctor.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([DoctorEntity])],
  providers: [DoctorsService],
  controllers: [DoctorsController],
})
export class DoctorsModule {}
