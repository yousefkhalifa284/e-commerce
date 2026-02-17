import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { Observable, tap, throwError } from 'rxjs';
import { CartDataResponse } from '../models/cart-data';
import { CartDetailsResponse } from '../models/cart-details';
import { PaymentDetailsResponse } from '../models/payment-details';

@Injectable({
  providedIn: 'root',
})
export class Cart {

  private readonly http = inject(HttpClient);

  cartCount: WritableSignal<number> = signal(0);

  addProductCart(productId: string): Observable<CartDataResponse> {
    return this.http.post<CartDataResponse>(
      `${environment.apiUrl}/cart`,
      { productId }
    ).pipe(
      tap(res => {
        this.cartCount.set(res.numOfCartItems);
      })
    );
  }

  getLoggedUserCart(): Observable<CartDetailsResponse> {
    return this.http.get<CartDetailsResponse>(
      `${environment.apiUrl}/cart`
    ).pipe(
      tap(res => {
        if (res.status === 'success') {
          this.cartCount.set(res.data.products.length);
        }
      })
    );
  }

  removeProductFromCart(id: string): Observable<CartDetailsResponse> {
    return this.http.delete<CartDetailsResponse>(
      `${environment.apiUrl}/cart/${id}`
    ).pipe(
      tap(res => {
        this.cartCount.set(res.data.products.length);
      })
    );
  }

  updateProductCartQuantity(id: string, count: number): Observable<CartDetailsResponse> {
    return this.http.put<CartDetailsResponse>(
      `${environment.apiUrl}/cart/${id}`,
      { count }
    ).pipe(
      tap(res => {
        this.cartCount.set(res.data.products.length);
      })
    );
  }

  clearCart(): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/cart`)
      .pipe(
        tap(() => this.cartCount.set(0))
      );
  }

createCashOrder(cartId: string, shippingAddress: object): Observable<any> {
  return this.http.post(
    `${environment.apiUrl}/orders/${cartId}`,
    { shippingAddress }
  );
}

  checkoutSession(cartId: string, checkoutData: object): Observable<PaymentDetailsResponse> {

    if (!cartId) {
      return throwError(() => new Error('Cart ID is missing'));
    }

    return this.http.post<PaymentDetailsResponse>(
      `${environment.apiUrl}/orders/checkout-session/${cartId}?url=http://localhost:4200`,
      checkoutData
    );
  }
}
