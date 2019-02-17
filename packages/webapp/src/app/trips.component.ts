import { Component, OnInit } from '@angular/core';
import { TripStatusUpdateService } from './trip-status-update.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'trips',
    templateUrl: './trips.component.html'
})
export class TripsComponent implements OnInit {
    private _tripStatus$: Observable<any>;

    constructor(private _tripStatusUpdateService: TripStatusUpdateService) {

    }

    public ngOnInit() {
        this._tripStatusUpdateService.tripStatus$.subscribe(() => {
            this.tripStatus = this._tripStatusUpdateService.tripStatus;
        });
    }

    public tripStatus: any;

}
