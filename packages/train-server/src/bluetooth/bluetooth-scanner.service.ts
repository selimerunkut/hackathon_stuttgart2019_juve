import { Injectable } from '@nestjs/common';
import { Subject, timer, interval } from 'rxjs';
import { take } from 'rxjs/operators';
import { BLUETOOTH_SCAN_INTERVAL, BLUETOOTH_SCAN_CANCEL_TIMEOUT } from 'src/shared/consts';

var noble = require('@abandonware/noble');

@Injectable()
export class BluetoothScannerService {

  private _foundDevicesSource = new Subject();
  private _foundDevices$ = this._foundDevicesSource.asObservable();

  public get foundDevices$() {
    return this._foundDevices$;
  }

  public start() {
    const foundDevices = [];
    noble.on('discover', function (peripheral) {
      foundDevices.push({ mac: peripheral.address, name: peripheral.advertisement.localName, ts: new Date() });
    });
    timer(0, BLUETOOTH_SCAN_INTERVAL).subscribe(() => {
      foundDevices.length = 0;
      noble.startScanning();
      interval(BLUETOOTH_SCAN_CANCEL_TIMEOUT)
        .pipe(take(1))
        .subscribe(() => {
          noble.stopScanning();
          this._foundDevicesSource.next([...foundDevices]);
        });
    });
  }
}
