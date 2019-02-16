import { Controller, Get, Post } from '@nestjs/common';
import { GatewayProviderService } from './hyperledger/gateway-provider.service';
import { Gateway } from 'fabric-network';

@Controller()
export class DeviceInfoController {
  constructor(
    private readonly _gatewayProviderService: GatewayProviderService) { }

  @Post('/start-trip')
  async startTrip() {
    try {
      const gateway: Gateway = await this._gatewayProviderService.getGateway();
      const network = await gateway.getNetwork('mychannel');
      const contract = network.getContract('fabcar');
      const event = {
          ts: new Date().toISOString(),
          mac: 'C0:FF:EE'
      };
      await contract.submitTransaction('startTrip', JSON.stringify(event));
      console.log(`Transaction has been evaluated.`);
    } catch (error) {
      console.error(`Failed to evaluate transaction: ${error}`);
      process.exit(1);
    }
  } 

  @Post('/end-trip')
  async endTrip() {
    try {
      const gateway: Gateway = await this._gatewayProviderService.getGateway();
      const network = await gateway.getNetwork('mychannel');
      const contract = network.getContract('fabcar');
      const event = {
          ts: new Date().toISOString(),
          mac: 'C0:FF:EE'
      };
      await contract.submitTransaction('endTrip', JSON.stringify(event));
      console.log(`Transaction has been evaluated.`);
    } catch (error) {
      console.error(`Failed to evaluate transaction: ${error}`);
      process.exit(1);
    }
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
