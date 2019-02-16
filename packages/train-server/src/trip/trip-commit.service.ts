
import { Controller, Get, Post, Body } from '@nestjs/common';
import { Gateway } from 'fabric-network';
import { GatewayProviderService } from 'src/hyperledger/gateway-provider.service';
import { StartStopTripDTO } from './start-stop-trip.dto';


@Controller()
export class TripCommitService {
  constructor(
    private readonly _gatewayProviderService: GatewayProviderService) { }

  async commitStartTrip(@Body() event: StartStopTripDTO) {
    try {
      if (!event || !event.ts || !event.mac) throw new Error('Invalid parameter: event.');
      const gateway: Gateway = await this._gatewayProviderService.getGateway();
      const network = await gateway.getNetwork('mychannel');
      const contract = network.getContract('fabcar');
      await contract.submitTransaction('startTrip', JSON.stringify(event));
      console.log(`Transaction has been evaluated.`);
    } catch (error) {
      console.error(`Failed to evaluate transaction: ${error}`);
      process.exit(1);
    }
  } 

  async endTrip(@Body() event: StartStopTripDTO) {
    try {
      if (!event || !event.ts || !event.mac) throw new Error('Invalid parameter: event.');
      const gateway: Gateway = await this._gatewayProviderService.getGateway();
      const network = await gateway.getNetwork('mychannel');
      const contract = network.getContract('fabcar');
      await contract.submitTransaction('endTrip', JSON.stringify(event));
      console.log(`Transaction has been evaluated.`);
    } catch (error) {
      console.error(`Failed to evaluate transaction: ${error}`);
      process.exit(1);
    }
  } 

  
}
