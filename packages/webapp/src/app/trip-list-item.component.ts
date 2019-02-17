import { Component, Input } from '@angular/core';

@Component({
    selector: 'trip-list-item',
    templateUrl: './trip-list-item.component.html',
    styleUrls: ['./trip-list-item.component.css']
})
export class TripListItem  {

    @Input()
    public tripStatus: any;

}
