import { Component, inject, OnInit, signal, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-all-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './allorders.html',
  styleUrl: './allorders.css'
})
export class AllOrdersComponent implements OnInit {
  private readonly _http = inject(HttpClient);
  private readonly _platformId = inject(PLATFORM_ID);

  orders = signal<any[]>([]);
  isLoading = signal(true);

  ngOnInit(): void {
    this.getUserOrders();
  }

  getUserOrders(): void {
    if (isPlatformBrowser(this._platformId)) {
      const token = localStorage.getItem('token');
      if (token) {
        const decoded: any = jwtDecode(token);
        const userId = decoded.id;

        this._http.get(`${environment.apiUrl}/orders/user/${userId}`).subscribe({
          next: (res: any) => {
            this.orders.set(res);
            this.isLoading.set(false);
          },
          error: (err) => {
            console.error(err);
            this.isLoading.set(false);
          }
        });
      }
    }
  }
}
