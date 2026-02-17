import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { Iresult } from '../../../shared/models/results/iresult.interface';
import { Iproducts } from '../../../shared/models/products/iproducts.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {

  private readonly http = inject(HttpClient);

  apiUrl: string = environment.apiUrl;

  products: WritableSignal<Iproducts[]> = signal([]);

  getAllProducts(page: number = 1, itemsPerPage: number = 12): Observable<Iresult<Iproducts[]>> {
  return this.http.get<Iresult<Iproducts[]>>(
    `${this.apiUrl}/products?page=${page}&limit=${itemsPerPage}`
  );
}
}
