import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getTax'
})
export class GetTaxPipe implements PipeTransform {

  transform(amount: unknown): number | '' {
    if (typeof amount !== 'number') {
      return '';
    }

    const tax = Math.floor(amount/100 * 18)
    return tax

  }

}
