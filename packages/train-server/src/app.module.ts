import { Module, OnModuleInit } from '@nestjs/common';
import { DeviceInfoController } from './device-info.controller';
import { AppService } from './app.service';
import { WalletProviderService } from './hyperledger/wallet-provider.service';
import { GatewayProviderService } from './hyperledger/gateway-provider.service';
import { BluetoothScannerService } from './bluetooth/bluetooth-scanner.service';
import { MockBluetoothScannerService } from './bluetooth/mock-bluetooth-scanner.service';
import { TripCorrelatorService } from './trip/trip-correlator.service';
import { TripStatusService } from './trip/trip-status.service';
import { MacHasherService } from './trip/mac-hasher.service';
import { debounceTime, map } from 'rxjs/operators'
import { merge } from 'rxjs';
import { MockController } from './mock.controller';
import { TripCommitService } from './trip/trip-commit.service';
import { WebsocketService } from './trip/websocket.service';
import { FailsafeService } from './shared/failsafe.service';

@Module({
  imports: [],
  controllers: [DeviceInfoController, MockController],
  providers: [AppService, WalletProviderService, MockBluetoothScannerService, GatewayProviderService, BluetoothScannerService, TripCorrelatorService, TripCommitService, TripStatusService, MacHasherService, WebsocketService, FailsafeService],
})
export class AppModule implements OnModuleInit {

  constructor(
    private _bluetoothScannerService: BluetoothScannerService,
    private _mockBluetoothScannerService: MockBluetoothScannerService,
    private _tripCorrelatorService: TripCorrelatorService,
    private _tripStatusService: TripStatusService,
    private _macHasherService: MacHasherService,
    private _websocketService: WebsocketService
  ) { }


  private mapDevice(device: any) {
    return {
      ...device,
      mac: this._macHasherService.hashMac(device.mac)
    };
  }

  public onModuleInit() {
    let timeSlices = [];
    const foundDevices$ =
      merge(
        //this._bluetoothScannerService.foundDevices$,
        this._mockBluetoothScannerService.foundDevices$
      )
        .pipe(
          debounceTime(100),
          map((devices: any[]) => devices.map((device: any) => this.mapDevice(device)))
        );
    foundDevices$
      .subscribe((newTimeSlice) => {
        timeSlices.push(newTimeSlice);
        this._tripCorrelatorService.test(timeSlices);
      });
    this._tripStatusService.initialize(foundDevices$);
    //this._bluetoothScannerService.start();
    /*
    timer(0,1000)
      .subscribe(() => 
      */
  }


}
