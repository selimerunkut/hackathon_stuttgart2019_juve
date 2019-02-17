import { Injectable } from '@nestjs/common';

@Injectable()
export class FailsafeService {
    public isFailsafeEnabled = false;
}