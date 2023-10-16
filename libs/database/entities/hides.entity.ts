import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { PatientEntity, DoctorEntity } from './';

@Entity('hides')
export class HidesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => PatientEntity, (patient) => patient.hides)
  @JoinColumn({ name: 'patient_id' })
  patient: PatientEntity;

  @ManyToOne((type) => DoctorEntity, (doctor) => doctor.hides)
  @JoinColumn({ name: 'doctor_id' })
  doctor: DoctorEntity;
}
