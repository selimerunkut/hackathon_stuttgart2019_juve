import { Component } from '@angular/core';

@Component({
  selector: 'oben',
  templateUrl: './oben.component.html',
  styleUrls: ['./oben.component.css']
})
export class ObenComponent {
  public anbieterList = [
    { anbietername: "DB", anbieterbeschreibung: "Schienenverkehr", 
      tarif: "0,20€", tarifbeschreibung: "per kilometer", 
      bild: '/assets/logo2.png'},
    { anbietername: "Car2Go", anbieterbeschreibung: "Carsharing",
      tarif: "0,19€", tarifbeschreibung: "per minute",
      bild: '/assets/logo3.png'},
    { anbietername: "Flixbus", anbieterbeschreibung: "Fernbus",
      tarif: "0,05€", tarifbeschreibung: "per kilometer",
      bild: '/assets/logo4.png'},
    { anbietername: "BlaBlaCar", anbieterbeschreibung: "Sharing",
      tarif: "0,05€", tarifbeschreibung: "per kilometer",
      bild: '/assets/logo5.png'},
    { anbietername: "myTaxi", anbieterbeschreibung: "Chauffeur",
      tarif: "2,35€", tarifbeschreibung: "per kilometer",
      bild: '/assets/logo6.png'}
  ];
}
