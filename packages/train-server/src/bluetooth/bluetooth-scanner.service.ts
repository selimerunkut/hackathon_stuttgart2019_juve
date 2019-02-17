import { Injectable } from '@nestjs/common';
import { Subject, timer, interval } from 'rxjs';
import { take } from 'rxjs/operators';
import { BLUETOOTH_SCAN_INTERVAL, BLUETOOTH_SCAN_CANCEL_TIMEOUT } from 'src/shared/consts';
import { BaseBluetoothScannerService } from './base-bluetooth-scanner.service';


@Injectable()
export class BluetoothScannerService extends BaseBluetoothScannerService {

  public start() {
    const noble = require('@abandonware/noble');
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
