import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { GatewayProviderService } from './hyperledger/gateway-provider.service';
import { Gateway } from 'fabric-network';
import { TripStatusService } from './trip/trip-status.service';
import { StartStopTripDTO } from './trip/start-stop-trip.dto';

@Controller()
export class DeviceInfoController {
  constructor(
    private readonly _gatewayProviderService: GatewayProviderService,
    private readonly _tripStatusService: TripStatusService
    ) { }

  @Post('/start-trip')
  async startTrip(@Body() event: StartStopTripDTO) {
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

  @Post('/end-trip')
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

  @Get('/trip-status/:mac')
  async getCurrenTripStatus(@Param('mac') mac: string) {
  
    const duration = this._tripStatusService.getTripDuration(mac);
    const kilometres = this._tripStatusService.getKilometersOfTrip(mac);
    const startDate = this._tripStatusService.getStartDateOfTrip(mac);
    return Promise.resolve({
      duration,
      kilometres,
      departure: 'Böblingen',
      nextStop: 'Goldberg',
      direction: 'München',
      startDate
    });
  }

  @Get()
  async findAllEvents() {
    try {
      const gateway: Gateway = await this._gatewayProviderService.getGateway();
      const network = await gateway.getNetwork('mychannel');
      const contract = network.getContract('fabcar');
      const result = await contract.evaluateTransaction('findAllEvents');
      console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
      return Promise.resolve(JSON.parse(result.toString()));
    } catch (error) {
      console.error(`Failed to evaluate transaction: ${error}`);
      process.exit(1);
    }
  }

}
