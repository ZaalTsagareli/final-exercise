import { GenderEnum } from 'libs/enums';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { HidesEntity } from './hides.entity';

@Entity('patient')
export class PatientEntity {
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
    type: 'varchar',
    nullable: false,
    name: 'password',
  })
  password: string;

  // In PatientEntity
  @OneToMany((type) => HidesEntity, (hides) => hides.patient)
  hides: HidesEntity[];

  @Column({ type: 'date', name: 'created_at', default: new Date() })
  createdAt: string;

  @Column({ type: 'date', name: 'updated_at', default: new Date() })
  updatedAt: string;
}
