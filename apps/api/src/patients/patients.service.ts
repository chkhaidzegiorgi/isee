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
    query: Paging & { searchValue: string }
  ): Promise<ListResult<PatientEntity>> {
    const take = query.take || 10;
    const page = query.page || 1;
    const skip = page * take;
    const keyword = query.searchValue || '';

    const [result, total] = await this.patientRepository.findAndCount({
      where: [
        { id_number: Like('%' + keyword + '%') },
        { lastname: Like('%' + keyword + '%') },
      ],
      order: { created_at: 'DESC' },
      take: take,
      skip: skip,
    });

    return {
      records: result,
      count: total,
    };
  }

  async get(id: string): Promise<PatientEntity> {
    return await this.patientRepository.findOne(id);
  }

  async create(patient): Promise<InsertResult> {
    patient.updated_by = 'Giorgi';
    return await this.patientRepository.insert(patient);
  }

  async modify(id, patient): Promise<UpdateResult> {
    patient.updated_by = 'Giorgi';
    return await this.patientRepository.update(id, patient);
  }
}
