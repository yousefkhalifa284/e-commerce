import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class AllOrdersService {
  private readonly _httpClient = inject(HttpClient);

  getUserOrders(userId: string): Observable<any> {
    return this._httpClient.get(`${environment.apiUrl}/orders/user/${userId}`);
  }
}
