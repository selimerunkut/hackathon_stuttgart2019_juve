import { BrowserModule } from '@angular/platform-browser';
import { NgModule, OnInit } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ObenComponent } from './oben.component';
import { AnbieterComponent } from './anbieter.component';
import { TripsComponent } from './trips.component';

import axios from 'axios';
import { NewTripModalComponent } from './new-trip-modal.component';
import { Header } from './header.component';
import { TripStatusUpdateService } from './trip-status-update.service';
import { HttpModule } from '@angular/http';
import { PriceDisplayPipe } from './shared/price-display.pipe';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { KilometerDisplayPipe } from './shared/kilometer-display.pipe';
import { TimeFormatDisplayPipe } from './shared/time-format-display.pipe';

const DEFAULT_BASE_URL = 'http://localhost:3000';

registerLocaleData(en);
const setBaseUrl = (baseURL) => {
  axios.defaults.baseURL = baseURL;
};
(window as any).setBaseUrl = setBaseUrl;
setBaseUrl(DEFAULT_BASE_URL);

@NgModule({
  declarations: [
    AppComponent,
    ObenComponent,
    AnbieterComponent,
    TripsComponent,
    NewTripModalComponent,
    Header,
    PriceDisplayPipe,
    KilometerDisplayPipe,
    TimeFormatDisplayPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [TripStatusUpdateService, { provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule {

 }
