import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { MAC_HASH_SALT } from '../shared/consts';

@Injectable()
export class MacHasherService {

  public hashMac(mac: string) {
    const hasher = crypto.createHash('sha256');
    hasher.update(`${MAC_HASH_SALT}${mac}`);
    return hasher.digest('hex');
  }
}