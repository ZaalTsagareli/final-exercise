import { PatientRequestInterface } from '@app/common/interfaces';
import { AccessGuardPatient } from '@app/common/jwt/guards';
import { OtpDto } from '@app/doctor-lib/dtos/otp.dto';
import { PatientLibService } from '@app/patient-lib';
import { CreatePatientDto, LoginPatientDto } from '@app/patient-lib/dtos';
import { HideDoctorDto } from '@app/patient-lib/dtos/hide-doctor.dto';
import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Param,
  BadRequestException,
} from '@nestjs/common';
import { PatientEntity } from 'libs/database/entities';

@Controller('patient')
export class PatientController {
  public constructor(private readonly patientService: PatientLibService) {}

  @UseGuards(AccessGuardPatient)
  @Get('/')
  public test(@Request() { user }: { user: PatientRequestInterface }) {
    console.log(user);
    return 'secured';
  }
  @Post('/signup')
  public async signup(@Body() data: CreatePatientDto): Promise<object> {
    return await this.patientService.signUp(data);
  }

  @Post('/verife')
  public async verife(@Body() otp: OtpDto): Promise<PatientEntity> {
    return await this.patientService.verife(otp);
  }

  @Post('/login')
  public async login(@Body() data: LoginPatientDto) {
    return await this.patientService.validate(data);
  }

  @UseGuards(AccessGuardPatient)
  @Post('/hide-doctor')
  public async hide(
    @Body() data: HideDoctorDto,
    @Request() { user }: { user: PatientRequestInterface },
  ) {
    return await this.patientService.hideDoctor(data, user);
  }

  @UseGuards(AccessGuardPatient)
  @Get('/get-offer/:consultationId')
  public async getItemById(
    @Param('consultationId') consultationId: string,
    @Request() { user }: { user: PatientRequestInterface },
  ) {
    if (typeof parseInt(consultationId) !== 'number') {
      throw new BadRequestException('parameter should be an int');
    }
    return await this.patientService.getOffer(parseInt(consultationId), user);
  }
}
