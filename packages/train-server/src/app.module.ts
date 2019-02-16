import { Module, OnModuleInit } from '@nestjs/common';
import { DeviceInfoController } from './device-info.controller';
import { AppService } from './app.service';
import { WalletProviderService } from './hyperledger/wallet-provider.service';
import { GatewayProviderService } from './hyperledger/gateway-provider.service';
import { BluetoothScannerService } from './bluetooth/bluetooth-scanner.service';
import { TripCorrelatorService } from './trip/trip-correlator.service';
import { DataFrame } from 'data-forge';


@Module({
  imports: [],
  controllers: [DeviceInfoController],
  providers: [AppService, WalletProviderService, GatewayProviderService, BluetoothScannerService, TripCorrelatorService],
})
export class AppModule implements OnModuleInit {

  constructor(private _bluetoothScannerService: BluetoothScannerService,
    private _tripCorrelatorService: TripCorrelatorService) { }

  public onModuleInit() {

  let timeSlices = [];
    this._bluetoothScannerService.foundDevices$.subscribe((newTimeSlice) => {
      timeSlices.push(newTimeSlice);
      this._tripCorrelatorService.test(timeSlices);
    });
    this._bluetoothScannerService.start();
  }



}
