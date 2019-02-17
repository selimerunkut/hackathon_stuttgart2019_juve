import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'kilometerDisplay'
})
export class KilometerDisplayPipe implements PipeTransform {
    public transform(value: number, ...args: any[]) {
        return `${value.toFixed(2)} km`;
    }

}