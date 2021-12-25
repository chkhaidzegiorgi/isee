import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('patients')
export class Patient {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;
}
