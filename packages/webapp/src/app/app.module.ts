import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ObenComponent } from './oben.component';
import { AnbieterComponent } from './anbieter.component';
import { TripsComponent } from './trips.component';

import axios from 'axios';
import { NewTripModalComponent } from './new-trip-modal.component';
axios.defaults.baseURL = 'http://localhost:3000';

@NgModule({
  declarations: [
    AppComponent,
    ObenComponent,
    AnbieterComponent,
    TripsComponent,
    NewTripModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
