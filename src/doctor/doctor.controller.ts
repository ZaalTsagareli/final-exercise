import { LocalGuard } from '@app/common/jwt/guards';
import { DoctorLibService } from '@app/doctor-lib';
import { CreateDoctorDto, LoginUserDto } from '@app/doctor-lib/dtos';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';

@Controller('doctor')
export class DoctorController {
  public constructor(private readonly doctorService: DoctorLibService) {}
  @Post('/signup')
  public async signup(@Body() doctor: CreateDoctorDto) {
    return await this.doctorService.signUp(doctor);
  }

  @Post('/login')
  public async login(@Body() data: LoginUserDto) {
    return await this.doctorService.validate(data);
  }

  @UseGuards(LocalGuard)
  @Post('/update-information')
  public async updateInformation() {
    console.log('aqvar', 'ddddddddddddddddddddddddd');
    return 'xd';
  }
}
