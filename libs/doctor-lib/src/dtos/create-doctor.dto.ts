import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsEnum,
  IsInt,
  IsBoolean,
  IsDate,
  IsOptional,
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
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsBoolean()
  verified: boolean;

  @IsOptional()
  @IsDate()
  createdAt: string;

  @IsOptional()
  @IsDate()
  updatedAt: string;
}
