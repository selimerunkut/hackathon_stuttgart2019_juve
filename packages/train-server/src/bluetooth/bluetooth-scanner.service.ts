import { Injectable } from '@nestjs/common';
import {Subject, timer} from 'rxjs';
import * as bluetooth from 'node-bluetooth';

@Injectable()
export class BluetoothScannerService {

  private _foundDevicesSource = new Subject();
  private _foundDevices$ = this._foundDevicesSource.asObservable();

  public get foundDevices$() {
    return this._foundDevices$;
  }

  public start() {
    const device = new bluetooth.DeviceINQ();
    timer(0, 30*1000).subscribe(() => {
      const foundDevices = [];
      device
        .on('finished', () => {
            this._foundDevicesSource.next(foundDevices);
        })
        .on('found', (mac, name) => foundDevices.push({
          mac, name, ts: new Date()
        }))
        .scan();
    });
  }
}
