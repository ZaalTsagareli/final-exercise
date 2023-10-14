import { GenderEnum } from 'libs/enums';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CountryEntity, DoctorTypesEntity, PatientEntity } from '.';

@Entity('consultations')
export class ConsultationsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'int',
    nullable: false,
    name: 'price_per_hour',
  })
  pricePerHour: number;

  @ManyToOne((t) => CountryEntity, (country) => country.id)
  @JoinColumn()
  country: CountryEntity;

  @ManyToOne((t) => PatientEntity, (patient) => patient.id)
  @JoinColumn()
  patient: PatientEntity;

  @ManyToOne((t) => DoctorTypesEntity, (type) => type.id)
  @JoinColumn({ name: 'doctor_type_id' })
  doctorType: DoctorTypesEntity;
}
