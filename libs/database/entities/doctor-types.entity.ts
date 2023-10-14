import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('doctor_types')
export class DoctorTypesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
    name: 'type',
  })
  type: string;
}
