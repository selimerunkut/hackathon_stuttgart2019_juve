import { Module } from '@nestjs/common';
import { DeviceInfoController } from './device-info.controller';
import { AppService } from './app.service';
import { WalletProviderService } from './hyperledger/wallet-provider.service';
import { GatewayProviderService } from './hyperledger/gateway-provider.service';

@Module({
  imports: [],
  controllers: [DeviceInfoController],
  providers: [AppService, WalletProviderService, GatewayProviderService],
})
export class AppModule {

}
