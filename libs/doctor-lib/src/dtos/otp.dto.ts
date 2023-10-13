import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class OtpDto {
  @IsNotEmpty()
  @IsNumber()
  otp: number;
}
