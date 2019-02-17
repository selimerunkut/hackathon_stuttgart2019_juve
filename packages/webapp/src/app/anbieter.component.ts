import { Component, Input } from '@angular/core';

@Component({
  selector: 'anbieter',
  templateUrl: './anbieter.component.html',
  styleUrls: ['./anbieter.component.css']
})
export class AnbieterComponent {

    @Input() public anbietername: String;
    @Input() public anbieterbeschreibung: String;
    @Input() public tarif: String;
    @Input() public tarifbeschreibung: String;
    @Input() public bild: String;
}
