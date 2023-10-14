import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('countries')
export class CountryEntity {
  @PrimaryColumn()
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
    name: 'country',
  })
  country: string;
}
