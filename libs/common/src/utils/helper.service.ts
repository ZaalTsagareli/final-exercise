import { Injectable } from '@nestjs/common';
import { DoctorEntity, HidesEntity } from 'libs/database/entities';
import { DateTime } from 'luxon';

export function datetime() {
  return DateTime.now().toFormat('yyyy-MM-dd HH:mm:ss');
}

@Injectable()
export class HelperService {
  public datetime() {
    return DateTime.now().toFormat('yyyy-MM-dd HH:mm:ss');
  }
  public filterDoctors(
    doctors: DoctorEntity[],
    hidedDoctors: HidesEntity[],
  ): DoctorEntity[] {
    const filteredDoctors = doctors.filter((doctor) => {
      return !hidedDoctors.some(
        (hideDoctors) => hideDoctors.doctor.id === doctor.id,
      );
    });
    return filteredDoctors;
  }
}
