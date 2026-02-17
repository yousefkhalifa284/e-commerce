import { Injectable } from '@angular/core';
import { Iresult } from '../../../shared/models/results/iresult.interface';
import { Iproducts } from '../../../shared/models/products/iproducts.interface';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductDetailsServices {
  constructor(private readonly http: HttpClient) {

  }
  apiUrl : string = environment.apiUrl;
  getProductsDetails(id:string|null):Observable<{data:Iproducts}> {
    return this.http.get<{data:Iproducts}>(this.apiUrl +'/products/'+id);
  }
}
