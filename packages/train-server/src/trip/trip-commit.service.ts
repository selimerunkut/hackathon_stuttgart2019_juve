
import { Injectable } from '@nestjs/common';
import { Gateway } from 'fabric-network';
import { GatewayProviderService } from 'src/hyperledger/gateway-provider.service';
import { StartStopTripDTO } from './start-stop-trip.dto';
import * as uuid from 'uuid';
import { TripStatusService } from './trip-status.service';
import { WebsocketService } from './websocket.service';

const TRAVEL_RATE_OFFSET = 1.04;
const TRAVEL_RATE_MAX_DEVIATION = 0.12;

@Injectable()
export class TripCommitService {
  constructor(
    private readonly _gatewayProviderService: GatewayProviderService,
    private readonly _tripStatusService: TripStatusService,
    private _websocketService: WebsocketService) { }

  async commitStartTrip(payload: StartStopTripDTO) {
    try {
      if (!payload || !payload.ts || !payload.mac) throw new Error('Invalid parameter: event.');
      const travelRate = TRAVEL_RATE_OFFSET + Math.round((TRAVEL_RATE_MAX_DEVIATION * Math.random()) / 0.01) * 0.01;
      payload.travelRate = travelRate;
      payload.tripId = uuid();
      this._tripStatusService.assignTripId(payload.mac, payload.tripId, payload.ts);
      this._tripStatusService.travelRateByTripId.set(payload.tripId, travelRate);
      const gateway: Gateway = await this._gatewayProviderService.getGateway();
      const network = await gateway.getNetwork('mychannel');
      const contract = network.getContract('fabcar');
      await contract.submitTransaction('startTrip', JSON.stringify(payload));
      console.log(`Transaction has been evaluated.`);
      this._websocketService.sendEvent({type: 'TripStarted'});
    } catch (error) {
      console.error(`Failed to evaluate transaction: ${error}`);
      process.exit(1);
    }
  } 

  async endTrip( event: StartStopTripDTO) {
    try {
      if (!event || !event.ts || !event.mac) throw new Error('Invalid parameter: event.');
      const gateway: Gateway = await this._gatewayProviderService.getGateway();
      const network = await gateway.getNetwork('mychannel');
      const contract = network.getContract('fabcar');
      await contract.submitTransaction('endTrip', JSON.stringify(event));
      console.log(`Transaction has been evaluated.`);
      this._tripStatusService.getTripStatus(event.mac);
      this._websocketService.sendEvent({type: 'TripEnded'});
    } catch (error) {
      console.error(`Failed to evaluate transaction: ${error}`);
      process.exit(1);
    }
  } 

  
}
