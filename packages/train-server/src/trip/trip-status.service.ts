import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { GatewayProviderService } from 'src/hyperledger/gateway-provider.service';
import { Gateway } from 'fabric-network';
import { isArray } from 'util';


@Injectable()
export class TripStatusService {

    private _devicesFirstSeen = new Map<string, any>();
    private _devicesLastSeen = new Map<string, any>();
    private _tripIdForDevice = new Map<string, string>();

    constructor(private readonly _gatewayProviderService: GatewayProviderService) {

    }

    public initialize(foundDevices$: Observable<any>) {
        foundDevices$
            .subscribe((devices) => {
                for (let device of devices) {
                    if (!this._devicesFirstSeen.has(device.mac)) {
                        this._devicesFirstSeen.set(device.mac, device.ts);
                    }
                    this._devicesLastSeen.set(device.mac, device.ts);
                }
            });
    }

    public getTripDuration(mac: string) {
        const lastSeenAt = this._devicesLastSeen.get(mac);
        const tripDurationInSeconds = (lastSeenAt.getTime() - this._devicesFirstSeen.get(mac).getTime()) / 1000;
        return tripDurationInSeconds;
    }

    public getStartDateOfTrip(mac: string) {
        return this._devicesFirstSeen.get(mac);
    }

    public getKilometersOfTrip(mac: string) {
        const KILOMETERS_PER_SECOND = 0.02;
        const duration = this.getTripDuration(mac);
        const kilometers = duration * KILOMETERS_PER_SECOND;
        return kilometers;
    }

    public async getTripStatus(mac: string) {
        const tripId = this._tripIdForDevice.get(mac);
        const kilometers = this.getKilometersOfTrip(mac);
        let status: any = {
            duration: this.getTripDuration(mac),
            startDate: this.getStartDateOfTrip(mac),
            kilometers,
            tripId,
            completed: false
        };
        if (!!tripId && this.travelRateByTripId.has(tripId)) {
            const travelRate = this.travelRateByTripId.get(tripId);
            const price = kilometers * travelRate;
            status = {...status, price};
        }
        const gateway: Gateway = await this._gatewayProviderService.getGateway();
        const network = await gateway.getNetwork('mychannel');
        const contract = network.getContract('fabcar');
        const serializedAllEvents = (await contract.evaluateTransaction('findAllEvents')).toString();
        const allEvents = JSON.parse(JSON.parse(serializedAllEvents));
        let tripEvent: any = null;
        if (!!tripId) tripEvent = allEvents.filter((e: any) => e.type == 'trip-completed' && e.payload.tripId == tripId)[0];
        if (!!tripEvent) {
            status = {...status, ...tripEvent.payload, completed: true};
            delete status.startId;
            //delete status.endId;
        }
        if (!!tripId) this.tripStatusById.set(tripId, status);
        return Promise.resolve(status);
    }

    public assignTripId(mac: string, tripId: string, ts: string) {
        this._devicesFirstSeen.set(mac, new Date(ts));
        this._tripIdForDevice.set(mac, tripId);
    }

    public tripStatusById = new Map<string, any>();
    public travelRateByTripId = new Map<string, number>();

}