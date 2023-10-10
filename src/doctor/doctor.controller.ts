import { DoctorLibService } from '@app/doctor-lib';
import { Controller, Post } from '@nestjs/common';

@Controller('doctor')
export class DoctorController {
  public constructor(private readonly doctorService: DoctorLibService) {}
  @Post('/')
  public async test() {}
}
