import { Injectable } from '@nestjs/common';
import { Subject, timer, interval } from 'rxjs';
import { take } from 'rxjs/operators';

var noble = require('@abandonware/noble');

@Injectable()
export class BluetoothScannerService {

  private _foundDevicesSource = new Subject();
  private _foundDevices$ = this._foundDevicesSource.asObservable();

  private _deviceLastSeenAt = new Map<string, Date>();

  public get foundDevices$() {
    return this._foundDevices$;
  }

  public start() {
    const foundDevices = [];
    noble.on('discover', function (peripheral) {
      foundDevices.push({ mac: peripheral.address, name: peripheral.advertisement.localName, ts: new Date() });
    });
    timer(0, 30 * 1000).subscribe(() => {
      foundDevices.length = 0;
      noble.startScanning();
      interval(15 * 1000)
        .pipe(take(1))
        .subscribe(() => {
          noble.stopScanning();
          this._foundDevicesSource.next([...foundDevices]);
        });
    });
  }
}
