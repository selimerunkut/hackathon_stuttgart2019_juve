/*
 * SPDX-License-Identifier: Apache-2.0
 */

import { Context, Contract } from 'fabric-contract-api';

export class FabCar extends Contract {

    public async initLedger(ctx: Context) {
        console.info('============= START : Initialize Ledger ===========');
        console.info('============= END : Initialize Ledger ===========');
    }

    public async startTrip(ctx: Context, serializedPayload: string) {
        const payload = JSON.parse(serializedPayload);
        const event = {type: 'start-trip', payload};
        const id = `${payload.mac}-${payload.ts}`;
        await ctx.stub.putState(id, Buffer.from(JSON.stringify(event)));
        console.info('============= END : Create Car ===========');
    }

    public async endTrip(ctx: Context, serializedPayload: string) {
        const payload = JSON.parse(serializedPayload);
        const event = {type: 'end-trip', payload};
        const id = `${payload.mac}-${payload.ts}`;
        await ctx.stub.putState(id, Buffer.from(JSON.stringify(event)));
        const serializedStartEvent = await ctx.stub.getState(event.payload.startId);
        const startEvent = JSON.parse(serializedStartEvent.toString());
        console.log('startEvent', startEvent);
        console.info('============= END : Create Car ===========');
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

    public async findAllEvents(ctx: Context): Promise<string> {
        const iterator = await ctx.stub.getStateByRange('', 'F');
        const allResults = [];
        while (true) {
            const res = await iterator.next();
            if (res.value && res.value.value.toString()) {
                console.log(res.value.value.toString('utf8'));
                let event;
                try {
                    event = JSON.parse(res.value.value.toString('utf8'));
                } catch (err) {
                    console.log(err);
                    event = res.value.value.toString('utf8');
                }
                event = {id: res.value.key, ...event};
                allResults.push(event);
            }
            if (res.done) {
                console.log('end of data');
                await iterator.close();
                console.info(allResults);
                return JSON.stringify(allResults);
            }
        }
    }

}
