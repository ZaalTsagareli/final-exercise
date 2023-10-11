import { DoctorLibService } from '@app/doctor-lib';
import { Controller, Post } from '@nestjs/common';

@Controller('doctor')
export class DoctorController {
  public constructor(private readonly doctorService: DoctorLibService) {}
  @Post('/signup')
  public async signup() {}

  @Post('/update-information')
  public async updateInformation() {}
}
