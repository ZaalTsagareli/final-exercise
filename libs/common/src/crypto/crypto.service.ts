import { compare, genSalt, hash } from 'bcrypt';
import * as crypto from 'crypto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CryptoService {
  public async comparePassword(password: string, hashedPassword: string) {
    return await compare(password, hashedPassword);
  }

  public async hashPassword(payload: string, saltValue: number = 10) {
    const salt = await this.generateSaltValue(saltValue);
    return await hash(payload, salt);
  }

  public async generateSaltValue(saltValue: number) {
    return await genSalt(saltValue);
  }

  public generateOtpVerificationCode() {
    return Math.floor(Math.random() * 900_000) + 100_000;
  }

  public generateRandomByes(): Promise<string> {
    return new Promise((resolve, reject) => {
      const salt = crypto.randomBytes(16);

      crypto.pbkdf2('zaali', salt, 100000, 64, 'sha512', (err, derivedKey) => {
        if (err) {
          reject(err);
        }
        resolve(derivedKey.toString('base64'));
      });
    });
  }
}
