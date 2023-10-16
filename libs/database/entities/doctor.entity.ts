import { GenderEnum } from 'libs/enums';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CountryEntity, DoctorTypesEntity } from '.';
import { HidesEntity } from './hides.entity';

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

  @ManyToOne(() => CountryEntity, (country) => country.id)
  @JoinColumn({ name: 'country_id' })
  country: CountryEntity;

  @ManyToOne(() => DoctorTypesEntity, (tp) => tp.id)
  @JoinColumn({ name: 'type_id' })
  type: DoctorTypesEntity;

  @OneToMany((type) => HidesEntity, (hides) => hides.doctor)
  hides: HidesEntity[];

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
