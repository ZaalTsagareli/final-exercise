import { GenderEnum } from 'libs/enums';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column({
    type: 'integer',
    nullable: false,
    name: 'phone_number',
  })
  phoneNumber: number;

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

  @Column({ type: 'date', name: 'created_at', default: new Date() })
  updatedAt: string;
}
