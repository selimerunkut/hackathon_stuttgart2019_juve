import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class MacHasherService {

  public hashMac(mac: string) {
    const hasher = crypto.createHash('sha256');
    hasher.update(mac);
    return hasher.digest('hex');
  }
}