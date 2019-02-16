import { WalletProviderService } from './wallet-provider.service';
import * as fs from 'fs';
import * as path from 'path';
import { Gateway } from 'fabric-network';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GatewayProviderService {

    constructor(private _walletProviderService: WalletProviderService)  {

    }
    
    public async getGateway(): Promise<Gateway> {
      const wallet = await this._walletProviderService.getWallet();
      const ccpPath = path.resolve(__dirname, '..', '..', '..', 'basic-network', 'connection.json');
      const ccpJSON = fs.readFileSync(ccpPath, 'utf8');
      const ccp = JSON.parse(ccpJSON);
      const userExists = await wallet.exists('user1');
      if (!userExists) {
        console.log('An identity for the user "user1" does not exist in the wallet');
        console.log('Run the registerUser.ts application before retrying');
        return;
      }
      const gateway = new Gateway();
      await gateway.connect(ccp, { wallet, identity: 'user1', discovery: { enabled: false } });
      return Promise.resolve(gateway);
    }

}