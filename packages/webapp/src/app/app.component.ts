import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import { TripStatusUpdateService } from './trip-status-update.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private _tripStatusUpdateService: TripStatusUpdateService) {
    this._tripStatusUpdateService.initialize();
  }

  ngOnInit(): void {
    this._tripStatusUpdateService.tripStatus$.subscribe(() => {
      this.tripStatus = this._tripStatusUpdateService.tripStatus;
    });
    const socket = io('http://localhost:3100');
    socket.on('message', (data) => {
      const event = (data);
      if (event.type == 'TripStarted') {
        //alert('TripStarted');
      }
    });
  }

  public tripStatus: any;

  title = 'webapp';
}
