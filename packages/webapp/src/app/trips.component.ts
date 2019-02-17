import { Component, OnInit } from '@angular/core';
import { TripStatusUpdateService } from './trip-status-update.service';
import { Observable } from 'rxjs';
import { HistoricalTripsService } from './historical-trips.service';

@Component({
    selector: 'trips',
    templateUrl: './trips.component.html'
})
export class TripsComponent implements OnInit {

    constructor(
        private _tripStatusUpdateService: TripStatusUpdateService,
        private _historicalTripsService: HistoricalTripsService
        ) {

    }

    public ngOnInit() {
        this._tripStatusUpdateService.tripStatus$.subscribe(() => {
            this.tripStatus = this._tripStatusUpdateService.tripStatus;
        });
    }

    public tripStatus: any;

    public get historicalTrips$() {
        return this._historicalTripsService.historicalTrips$;
    }

}
