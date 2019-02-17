import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    const socket = io('http://localhost:3100');
    socket.on('message', (data) => console.log('data', data));
  }
  title = 'webapp';
}
