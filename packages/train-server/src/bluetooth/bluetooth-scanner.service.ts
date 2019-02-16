import { Injectable } from '@nestjs/common';
import { Subject, timer } from 'rxjs';
import * as bluetooth from 'node-bluetooth';

@Injectable()
export class BluetoothScannerService {

  private _foundDevicesSource = new Subject();
  private _foundDevices$ = this._foundDevicesSource.asObservable();

  private _deviceLastSeenAt = new Map<string, Date>();

  public get foundDevices$() {
    return this._foundDevices$;
  }

  public start() {
    const device = new bluetooth.DeviceINQ();
    timer(0, 30 * 1000).subscribe(() => {
      const foundDevices = [];
      device
        .on('finished', () => {
          this._foundDevicesSource.next([...foundDevices]);
        })
        .on('found', (mac, name) => {
          const ts = new Date();
          if (this._deviceLastSeenAt.has(mac)) {
            const prevSeenAt = this._deviceLastSeenAt.get(mac);
            const deltaT = ts.getTime() - prevSeenAt.getTime();
            if (Math.abs(deltaT) < 10000) return ;
          }
          this._deviceLastSeenAt.set(mac, ts)
          foundDevices.push({
            mac, name, ts
          })
        })
        .scan();
    });
  }
}
