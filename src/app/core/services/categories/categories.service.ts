import { Injectable, signal, WritableSignal } from '@angular/core';
import { Iresult } from '../../../shared/models/results/iresult.interface';
import { environment } from '../../../../environments/environment.testing';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Icategory } from '../../../shared/models/categories/icategory.interface';
import { Isubcategory } from '../../../shared/models/subcategories/isubcategory.interface';
import { Iproducts } from '../../../shared/models/products/iproducts.interface';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  apiUrl: string = environment.apiUrl;
  categories: WritableSignal<Icategory[]> = signal([]);

  constructor(private readonly http: HttpClient) {}

  getAllCategories(): Observable<Iresult<Icategory[]>> {
    return this.http.get<Iresult<Icategory[]>>(`${this.apiUrl}/categories`);
  }

  getSpecificCategory(id: string): Observable<Iresult<Icategory>> {
    return this.http.get<Iresult<Icategory>>(`${this.apiUrl}/categories/${id}`);
  }


  getSubCategoriesOnCategory(categoryId: string): Observable<Iresult<Isubcategory[]>> {
    return this.http.get<Iresult<Isubcategory[]>>(`${this.apiUrl}/categories/${categoryId}/subcategories`);
  }
  getSubCategories(categoryId: string): Observable<Iresult<Isubcategory[]>> {
    return this.http.get<Iresult<Isubcategory[]>>(`${this.apiUrl}/categories/${categoryId}/subcategories`);
  }


  getSubCategoryDetails(subcategoryId: string): Observable<Iresult<Isubcategory>> {
    return this.http.get<Iresult<Isubcategory>>(`${this.apiUrl}/subcategories/${subcategoryId}`);
  }
   getProductsByCategory(categoryId: string): Observable<Iresult<Iproducts[]>> {
    return this.http.get<Iresult<Iproducts[]>>(`${this.apiUrl}/products?category=${categoryId}`);
  }
}
