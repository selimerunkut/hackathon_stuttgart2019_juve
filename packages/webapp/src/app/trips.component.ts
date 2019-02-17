import { Component, OnInit } from '@angular/core';
import {timer} from 'rxjs';
import axios from 'axios';

@Component({
  selector: 'trips',
  templateUrl: './trips.component.html'
})
export class TripsComponent implements OnInit {

    public ngOnInit() {
        timer(0, 1000)
        .subscribe(() => this.refreshTripStatus());
    }

    private async refreshTripStatus() {
        const mac = '88f8c374c9acf10555a70c86c0b7552b91673e96a817d02c79a0107f3393ff9b';
        const {data} = await axios.get(`/trip-status-by-device/${mac}`);
        this.tripStatus = data;
    }

    public tripStatus: any;


}
