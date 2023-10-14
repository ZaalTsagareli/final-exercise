import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsEnum,
  IsInt,
  IsBoolean,
  IsDate,
  IsOptional,
  isInt,
} from 'class-validator';
import { GenderEnum } from 'libs/enums';

export class CreateDoctorDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsEnum(GenderEnum)
  gender: GenderEnum;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsInt()
  phoneNumber: number;

  @IsNotEmpty()
  @IsInt()
  countryId: number;

  @IsNotEmpty()
  @IsInt()
  pricePerHour: number;

  @IsNotEmpty()
  @IsInt()
  doctorProfessionTypeId: number;

  @IsNotEmpty()
  @IsString()
  password: string;
}
