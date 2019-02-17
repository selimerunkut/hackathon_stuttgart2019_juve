import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import { TripStatusUpdateService } from './trip-status-update.service';
import { NzMessageService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import { SOCKET_IO_URL } from './shared/consts';
import { HistoricalTripsService } from './historical-trips.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private _tripStatusUpdateService: TripStatusUpdateService,
    private _nzMessageService: NzMessageService,
    private _historicalTripsService: HistoricalTripsService,
    private _router: Router) {
    this._tripStatusUpdateService.initialize();
  }

  ngOnInit(): void {
    this._tripStatusUpdateService.tripStatus$.subscribe(() => {
      this.tripStatus = this._tripStatusUpdateService.tripStatus;
    });
    const socket = io(SOCKET_IO_URL);
    socket.on('message', (data) => {
      const event = (data);
      if (event.type == 'TripStarted') {
        this._nzMessageService.loading('You just got on the Blockchain train!');
        this._historicalTripsService.commitStashed();
      }
      if (event.type == 'TripEnded') {
        this._nzMessageService.success('Thank you for travelling with the Blockchain!');
        this._historicalTripsService.stashTrip(this._tripStatusUpdateService.tripStatus);
      }
    });
  }

  public get title() {
    const url = this._router.url;
    if (url.indexOf('oben') >= 0) {
      return 'Rates';
    }
    return 'Your Trip';
  }

  public tripStatus: any;

}
