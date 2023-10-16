import { DoctorLibService } from '@app/doctor-lib';
import { CreateDoctorDto, LoginUserDto } from '@app/doctor-lib/dtos';
import { OtpDto } from '@app/doctor-lib/dtos/otp.dto';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { DoctorEntity } from 'libs/database/entities';

@Controller('doctor')
export class DoctorController {
  public constructor(private readonly doctorService: DoctorLibService) {}
  @Post('/signup')
  public async signup(@Body() doctor: CreateDoctorDto): Promise<Object> {
    return await this.doctorService.signUp(doctor);
  }

  @Post('/verife')
  public async checkOtp(@Body() data: OtpDto): Promise<DoctorEntity> {
    return await this.doctorService.verifeDoctor(data);
  }
  @Post('/login')
  public async login(@Body() data: LoginUserDto) {
    return await this.doctorService.validate(data);
  }
}
