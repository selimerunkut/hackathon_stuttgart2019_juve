import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'timeFormatDisplay'
})
export class TimeFormatDisplayPipe implements PipeTransform {
    public transform(value: number, ...args: any[]) {
        const date = new Date(0);
        date.setSeconds(value);
        return date.toTimeString().split(" ")[0].substr(3); 
    }

}