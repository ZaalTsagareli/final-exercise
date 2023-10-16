import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsInt } from 'class-validator';

export class HideDoctorDto {
  @IsNotEmpty()
  @IsInt()
  @ApiProperty()
  doctorId: string;
}
