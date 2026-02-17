import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Brands {

 private readonly http = inject(HttpClient);

  getAllBrands(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/brands`);
  }

  getSpecificBrand(brandId: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/brands/${brandId}`);
  }

  getProductsByBrand(brandId: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/products?brand=${brandId}`);
  }
}
