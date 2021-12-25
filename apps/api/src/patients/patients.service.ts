import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from '../entities/patient.entity';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>
  ) {}

  getPatients(): Promise<Patient[]> {
    return this.patientRepository.find();
  }

  add(patient): Promise<Patient> {
    this.patientRepository.insert(patient);
    return patient;
  }
}
