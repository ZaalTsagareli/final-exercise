import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail, IsEnum } from 'class-validator';
import { GenderEnum } from 'libs/enums';

export class CreatePatientDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  firstName: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
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
  @IsString()
  @ApiProperty()
  password: string;
}
