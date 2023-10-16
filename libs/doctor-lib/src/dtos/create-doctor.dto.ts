import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  lastName: string;

  @IsNotEmpty()
  @IsEnum(GenderEnum)
  @ApiProperty()
  gender: GenderEnum;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty()
  phoneNumber: number;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty()
  countryId: number;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty()
  pricePerHour: number;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty()
  doctorProfessionTypeId: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  password: string;
}
