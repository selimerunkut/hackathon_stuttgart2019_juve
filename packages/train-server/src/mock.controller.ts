import { Controller, Get, Post, Body } from '@nestjs/common';
import { MockBluetoothScannerService } from './bluetooth/mock-bluetooth-scanner.service';

@Controller('/mock')
export class MockController {
  constructor(
    private readonly _mockBluetoothScannerService: MockBluetoothScannerService) { }

  @Post('/bluetooth-scan')
  async startTrip(@Body() event: any) {
    const devices = event.devices;
    for(let device of devices) {
      if (!device.ts) device.ts = new Date();
      else device.ts = new Date(device.ts);
    }
    this._mockBluetoothScannerService.pushDevices(devices);
  }
  
}
