import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class HistoricalTripsService {

    public historicalTrips$ = new BehaviorSubject([]);

    private _stashedHistoricalTrips = [];
    private _historicalTrips = [];

    public commitStashed() {
        const stashedHistoricalTrips = [...this._stashedHistoricalTrips.reverse()];
        this._stashedHistoricalTrips.length = 0;
        const nextHistoricalTrips =  [...stashedHistoricalTrips, ...this._historicalTrips];
        nextHistoricalTrips.length = Math.min(nextHistoricalTrips.length, 4);
        this._historicalTrips.length = 0;
        this._historicalTrips.push(...nextHistoricalTrips);
        this.historicalTrips$.next(this._historicalTrips);
    }

    public stashTrip(trip) {
        this._stashedHistoricalTrips.push(trip);
    }

}