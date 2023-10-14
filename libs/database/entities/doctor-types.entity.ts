import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('doctor_types')
export class DoctorTypesEntity {
  @PrimaryColumn()
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
    name: 'type',
  })
  type: string;
}
