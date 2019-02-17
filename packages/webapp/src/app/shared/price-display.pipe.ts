import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'priceDisplay'
})
export class PriceDisplayPipe implements PipeTransform {
    public transform(value: number, ...args: any[]) {
        return `${value.toFixed(2)} €`;
    }

}