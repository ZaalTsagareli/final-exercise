import { Module } from '@nestjs/common';
import { CryptoService } from './crypto';
import { MailService } from './mail/mail.service';
import { HelperService } from './utils/helper.service';

@Module({
  providers: [CryptoService, MailService, CryptoService, HelperService],
  exports: [CryptoService, MailService, CryptoService, HelperService],
})
export class CommonModule {}
