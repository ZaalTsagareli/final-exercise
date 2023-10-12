import { DoctorLibService } from '@app/doctor-lib';
import { CreateDoctorDto } from '@app/doctor-lib/dtos';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('doctor')
export class DoctorController {
  public constructor(private readonly doctorService: DoctorLibService) {}
  @Post('/signup')
  public async signup(@Body() doctor: CreateDoctorDto) {
    return await this.doctorService.signUp();
  }

  @Post('/update-information')
  public async updateInformation() {
    return await this.doctorService.update();
  }
}
