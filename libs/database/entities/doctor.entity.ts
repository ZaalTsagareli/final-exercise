import { GenderEnum } from 'libs/enums';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CountryEntity, DoctorTypesEntity } from '.';

@Entity('doctor')
export class DoctorEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
    name: 'first_name',
  })
  firstName: string;

  @Column({
    type: 'varchar',
    nullable: false,
    name: 'last_name',
  })
  lastName: string;

  @Column({
    type: 'enum',
    enum: GenderEnum,
    nullable: false,
    name: 'gender',
  })
  gender: GenderEnum;

  @Column({
    type: 'varchar',
    nullable: false,
    name: 'email',
  })
  email: string;

  @Column({ name: 'price_per_hour', nullable: false, type: 'varchar' })
  pricePerHour: number;

  @OneToOne(() => CountryEntity)
  @JoinColumn()
  country: CountryEntity;

  @OneToOne(() => DoctorTypesEntity)
  @JoinColumn()
  type: DoctorTypesEntity;

  @Column({
    type: 'varchar',
    nullable: false,
    name: 'password',
  })
  password: string;

  @Column({
    type: 'bool',
    nullable: false,
    name: 'verified',
  })
  verified: boolean;

  @Column({ type: 'date', name: 'created_at', default: new Date() })
  createdAt: string;

  @Column({ type: 'date', name: 'updated_at', default: new Date() })
  updatedAt: string;
}
