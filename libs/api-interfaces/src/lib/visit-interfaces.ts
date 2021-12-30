import { Patient } from '..';

export interface Doctor {
  id?: number;
  name: string;
}

export interface Visit {
  id?: number;
  visit_date: Date;
  visit_time?: Date;
  price: number;
  created_at: Date;
  updated_at: Date;
  updated_by?: string;
  patient: Patient;
  patientId: number;
  doctor: Doctor;
  doctorId: number;
}
