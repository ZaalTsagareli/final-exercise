import { AccessGuardPatient } from '@app/common/jwt/guards';
import { ConsultationLibService } from '@app/consultation-lib';
import { CreateConsultationDto } from '@app/consultation-lib/dtos/create-consultation.dto';
import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PatientEntity } from 'libs/database/entities';

@ApiTags('cats')
@Controller('consultations')
export class ConsultationsController {
  public constructor(
    private readonly consultationsService: ConsultationLibService,
  ) {}

  @UseGuards(AccessGuardPatient)
  @Post('/create-consultation')
  public async createConsultation(
    @Body() data: CreateConsultationDto,
    @Request() { user }: { user: PatientEntity },
  ) {
    return await this.consultationsService.createConsultation(data, user);
  }
}
