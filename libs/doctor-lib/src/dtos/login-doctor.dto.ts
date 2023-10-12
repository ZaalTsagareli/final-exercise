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

export class LoginUserDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
