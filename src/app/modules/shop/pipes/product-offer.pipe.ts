import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productOffer'
})
export class ProductOfferPipe implements PipeTransform {

  transform(value: number | null): number | string {
    if (!value) {
      return '';
    }

    let percentage = (value+3000)/value
    percentage = (percentage - 1) * 100
    percentage = Math.floor(percentage)
  
    return percentage
  }

}
