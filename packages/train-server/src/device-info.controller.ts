import { Controller, Get } from '@nestjs/common';
import { WalletProviderService } from './hyperledger/wallet-provider.service';
import { GatewayProviderService } from './hyperledger/gateway-provider.service';
import { Gateway } from 'fabric-network';

@Controller()
export class DeviceInfoController {
  constructor(
    private readonly _gatewayProviderService: GatewayProviderService) { }

  @Get()
  async getHello() {
    try {
      const gateway: Gateway = await this._gatewayProviderService.getGateway();
      // Get the network (channel) our contract is deployed to.
      const network = await gateway.getNetwork('mychannel');
      // Get the contract from the network.
      const contract = network.getContract('fabcar');
      // Evaluate the specified transaction.
      // queryCar transaction - requires 1 argument, ex: ('queryCar', 'CAR4')
      // queryAllCars transaction - requires no arguments, ex: ('queryAllCars')
      const result = await contract.evaluateTransaction('queryAllCars');
      console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
      return Promise.resolve(JSON.parse(result.toString()));
    } catch (error) {
      console.error(`Failed to evaluate transaction: ${error}`);
      process.exit(1);
    }
  }
}
