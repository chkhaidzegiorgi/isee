import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DoctorEntity } from '../entities/doctor.entity';

@Injectable()
export class DoctorsService {
  constructor(
    @InjectRepository(DoctorEntity)
    private repository: Repository<DoctorEntity>
  ) {}

  async getList(): Promise<DoctorEntity[]> {
    return this.repository.find();
  }
}
