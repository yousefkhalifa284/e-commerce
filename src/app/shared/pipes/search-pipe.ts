import { Pipe, PipeTransform } from '@angular/core';
import { Iproducts } from '../models/products/iproducts.interface';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {

  transform(productList:Iproducts[],word:string): Iproducts[] {
    return productList.filter(item =>item.title.toLocaleLowerCase().includes(word.toLocaleLowerCase()));
  }

}
