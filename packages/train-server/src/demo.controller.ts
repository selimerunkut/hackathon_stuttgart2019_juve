import { Controller, Get } from '@nestjs/common';
import { FailsafeService } from './shared/failsafe.service';

@Controller('/demo')
export class DemoController {
  constructor(
    private readonly _failsafeService: FailsafeService
    ) { }

  @Get('/failsafe-on')
  public async demoFailSafeOn() {
    this._failsafeService.isFailsafeEnabled = true;
    console.warn('### Failsafe On ###');
    return Promise.resolve('FAILSAFE ON');
  }

  @Get('/failsafe-off')
  public async demoFailSafeOff() {
    this._failsafeService.isFailsafeEnabled = false;
    console.warn('### Failsafe Off ###');
    return Promise.resolve('FAILSAFE OFF');
  }

}
