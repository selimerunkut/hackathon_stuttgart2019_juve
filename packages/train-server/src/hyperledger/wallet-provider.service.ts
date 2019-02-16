import { FileSystemWallet, Gateway, Wallet } from 'fabric-network';
import * as path from 'path';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WalletProviderService {

    public getWallet(): Wallet {
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = new FileSystemWallet(walletPath);
        return wallet;
    }

}