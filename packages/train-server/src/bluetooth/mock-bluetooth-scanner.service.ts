import { Injectable } from '@nestjs/common';
import { Subject, timer, interval } from 'rxjs';

@Injectable()
export class MockBluetoothScannerService {

  private _foundDevicesSource = new Subject();
  private _foundDevices$ = this._foundDevicesSource.asObservable();


  public get foundDevices$() {
    return this._foundDevices$;
  }

public pushDevices(devices) {
    this._foundDevicesSource.next(devices);
}
}
