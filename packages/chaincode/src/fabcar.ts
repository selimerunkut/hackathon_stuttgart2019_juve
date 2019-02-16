/*
 * SPDX-License-Identifier: Apache-2.0
 */

import { Context, Contract } from 'fabric-contract-api';
import { Car } from './car';

export class FabCar extends Contract {

    public async initLedger(ctx: Context) {
        console.info('============= START : Initialize Ledger ===========');
        console.info('============= END : Initialize Ledger ===========');
    }

/*    public async createCar(ctx: Context, carNumber: string, make: string, model: string, color: string, owner: string) {
        console.info('============= START : Create Car ===========');

        const car: Car = {
            color,
            docType: 'car',
            make,
            model,
            owner,
        };

        await ctx.stub.putState(carNumber, Buffer.from(JSON.stringify(car)));
        console.info('============= END : Create Car ===========');
    }
    */

    public async queryAllCars(ctx: Context): Promise<string> {
        const allResults = [{"test":true}];
        return JSON.stringify(allResults);
    }

}
