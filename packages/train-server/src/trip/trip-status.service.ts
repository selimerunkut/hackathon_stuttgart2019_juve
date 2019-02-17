import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';


@Injectable()
export class TripStatusService {

    private _devicesFirstSeen = new Map<string, any>();
    private _devicesLastSeen = new Map<string, any>();

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
        const lastSeenAt = new Date(); //this._devicesLastSeen.get(mac);
        const tripDurationInSeconds = (lastSeenAt.getTime() - this._devicesFirstSeen.get(mac).getTime()) / 1000;
        return tripDurationInSeconds;
    }

    public getStartDateOfTrip(mac: string) {
        return this._devicesFirstSeen.get(mac);
    }

    public getKilometersOfTrip(mac: string) {
        const KILOMETERS_PER_SECOND = 0.02;
        const duration = this.getTripDuration(mac);
        const kilometres = duration * KILOMETERS_PER_SECOND;
        return kilometres;
    }

}