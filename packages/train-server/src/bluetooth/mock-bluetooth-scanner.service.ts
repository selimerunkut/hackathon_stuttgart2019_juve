import { Injectable } from '@nestjs/common';
import { BaseBluetoothScannerService } from './base-bluetooth-scanner.service';

@Injectable()
export class MockBluetoothScannerService extends BaseBluetoothScannerService {

  public pushDevices(devices) {
    this._foundDevicesSource.next(devices);
  }

}
