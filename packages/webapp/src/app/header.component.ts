import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: 'header.component.html',
    styleUrls: ['header.component.css']
})
export class Header {

    @Input() public tripStatus: any;
    @Input() public title: string;

}