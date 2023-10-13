import { Injectable } from '@nestjs/common';
import { DateTime } from 'luxon';

export function datetime() {
  return DateTime.now().toFormat('yyyy-MM-dd HH:mm:ss');
}

@Injectable()
export class HelperService {
  public datetime() {
    return DateTime.now().toFormat('yyyy-MM-dd HH:mm:ss');
  }
}
