import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IWishlist, IWishlistResponse } from '../../../../shared/models/Iwishlist/iwishlist';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'https://ecommerce.routemisr.com/api/v1/wishlist';


  private wishlistCountSubject = new BehaviorSubject<number>(0);
  wishlistCount$ = this.wishlistCountSubject.asObservable();

  getLoggedUserWishlist(): Observable<any> {
    return this.http.get<any>(environment.apiUrl+'/wishlist').pipe(
      tap((res) => {

        this.wishlistCountSubject.next(res.count || res.data?.length || 0);
      })
    );
  }

  addProductToWishlist(productId: string): Observable<any> {
    return this.http.post<any>(environment.apiUrl+'/wishlist', { productId }).pipe(
      tap((res) => {
        this.wishlistCountSubject.next(res.data?.length || 0);
      })
    );
  }

  removeProductFromWishlist(productId: string): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/wishlist/${productId}`).pipe(
      tap((res) => {
        this.wishlistCountSubject.next(res.data?.length || 0);
      })
    );
  }
}
