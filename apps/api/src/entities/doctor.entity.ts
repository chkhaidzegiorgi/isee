import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { VisitEntity } from './visit.entity';

@Entity('doctors')
export class DoctorEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name: string;

  @OneToMany(() => VisitEntity, (visit: VisitEntity) => visit.doctor)
  public visits: VisitEntity[];
}
