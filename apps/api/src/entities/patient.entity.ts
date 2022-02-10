import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { VisitEntity } from './visit.entity';

@Entity('patients')
export class PatientEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column({ unique: true, length: 13 })
  id_number: string;

  @Column({ type: 'timestamptz' })
  birthday?: Date;

  @Column()
  address?: string;

  @Column()
  disease?: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  updated_by?: string;

  @OneToMany(() => VisitEntity, (visit: VisitEntity) => visit.patient)
  public visits: VisitEntity[];
}
