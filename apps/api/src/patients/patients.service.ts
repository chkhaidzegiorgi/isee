import { ListResult, Paging } from '@isee/api-interfaces';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, Like, Repository, UpdateResult } from 'typeorm';
import { PatientEntity } from '../entities/patient.entity';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(PatientEntity)
    private patientRepository: Repository<PatientEntity>
  ) {}

  async getPatients(
    searchValue: string,
    page = 1,
    take = 10
  ): Promise<ListResult<PatientEntity>> {
    const skip = (page - 1) * take;
    const keyword = searchValue || '';

    const [result, total] = await this.patientRepository.findAndCount({
      where: { id_number: Like('%' + keyword + '%') },
      order: { created_at: 'DESC' },
      take: take,
      skip: skip,
    });

    return {
      records: result,
      count: total,
    };
  }

  async create(patient): Promise<InsertResult> {
    return await this.patientRepository.insert(patient);
  }

  async modify(id, patient): Promise<UpdateResult> {
    return await this.patientRepository.update(id, patient);
  }
}
