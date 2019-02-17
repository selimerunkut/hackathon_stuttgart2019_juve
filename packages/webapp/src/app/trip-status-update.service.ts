import { Injectable } from '@angular/core';
import { timer, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import axios from 'axios';

@Injectable()
export class TripStatusUpdateService {

    private _tripStatus$: Observable<any>;
    private _tripStatus: any;

    public initialize() {
        this._tripStatus$ = timer(0, 1000)
            .pipe(tap(() => this.refreshTripStatus()));
    }

    private async refreshTripStatus() {
        const mac = '88f8c374c9acf10555a70c86c0b7552b91673e96a817d02c79a0107f3393ff9b';
        const {data} = await axios.get(`/trip-status-by-device/${mac}`);
        this._tripStatus = data;
        console.log(data);
        //return data;
    }

    public get tripStatus() {
        return this._tripStatus;
    }

    public get tripStatus$() {
        return this._tripStatus$;
    }

}