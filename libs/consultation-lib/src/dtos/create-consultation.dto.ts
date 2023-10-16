import { IsNotEmpty, IsInt } from 'class-validator';

export class CreateConsultationDto {
  @IsNotEmpty()
  @IsInt()
  doctorTypeId: number;

  @IsNotEmpty()
  @IsInt()
  pricePerHour: number;

  @IsNotEmpty()
  @IsInt()
  countryId: number;
}
