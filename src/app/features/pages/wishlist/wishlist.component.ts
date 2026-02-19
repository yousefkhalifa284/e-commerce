import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Cart } from '../cart/services/cart';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from './serivces/wishlist';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, RouterLink,TranslateModule],
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  private readonly _wishlistService = inject(WishlistService);
  private readonly _cartService = inject(Cart);
  private readonly _toastr = inject(ToastrService);

  wishlistItems = signal<any[]>([]);
  isLoading = signal<boolean>(false);

  isLoadingCart: { [key: string]: boolean } = {};
  isLoadingRemove: { [key: string]: boolean } = {};

  ngOnInit(): void {

    setTimeout(() => {
      this.getWishlistItems();
    }, 0);
  }

  getWishlistItems(): void {
    this.isLoading.set(true);
    this._wishlistService.getLoggedUserWishlist().subscribe({
      next: (response) => {
        this.wishlistItems.set(response.data || []);
        this.isLoading.set(false);
      },
      error: (err) => {
        this._toastr.error('Failed to load wishlist');
        this.isLoading.set(false);
      }
    });
  }

  removeFromWishlist(productId: string): void {
    this.isLoadingRemove[productId] = true;
    this._wishlistService.removeProductFromWishlist(productId).subscribe({
      next: (response) => {
        if (response.status === 'success') {

          this.wishlistItems.update(items => items.filter(item => item._id !== productId && item.id !== productId));
          this._toastr.success('Item removed successfully');
        }
        this.isLoadingRemove[productId] = false;
      },
      error: () => {
        this.isLoadingRemove[productId] = false;
      }
    });
  }

  addToCart(productId: string): void {
    this.isLoadingCart[productId] = true;
    this._cartService.addProductCart(productId).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this._toastr.success(res.message);
        }
        this.isLoadingCart[productId] = false;
      },
      error: () => {
        this.isLoadingCart[productId] = false;
      }
    });
  }
}
