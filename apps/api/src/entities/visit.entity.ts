import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DoctorEntity } from './doctor.entity';
import { PatientEntity } from './patient.entity';

@Entity('visits')
export class VisitEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'timestamptz' })
  visit_date: Date;

  @Column()
  price: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  updated_by?: string;

  @ManyToOne(() => PatientEntity, (patient: PatientEntity) => patient.visits)
  public patient: PatientEntity;

  @Column()
  patientId: number;

  @ManyToOne(() => DoctorEntity, (doctor: DoctorEntity) => doctor.visits)
  public doctor: DoctorEntity;

  @Column()
  doctorId: number;
}
