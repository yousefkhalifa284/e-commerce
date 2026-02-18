import { Component, inject, Input, signal, OnInit } from '@angular/core';
import { Iproducts } from '../../models/products/iproducts.interface';
import { RouterLink } from "@angular/router";
import { Cart } from '../../../features/pages/cart/services/cart';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../../features/pages/wishlist/serivces/wishlist';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent implements OnInit {
  private readonly cartComponent = inject(Cart);
  private readonly wishlistService = inject(WishlistService);
  private readonly toastrService = inject(ToastrService);

  @Input() product!: Iproducts;

  isLoadingCart = signal(false);
  isLoadingWishlist = signal(false);
  isInWishlist = signal(false);

  ngOnInit(): void {
    this.checkWishlistStatus();
  }

  checkWishlistStatus(): void {
    this.wishlistService.getLoggedUserWishlist().subscribe({
      next: (res) => {
        const isFav = res.data.some((item: any) => item.id === this.product.id || item._id === this.product.id);
        this.isInWishlist.set(isFav);
      }
    });
  }

  toggleWishlist(id: string): void {
    this.isLoadingWishlist.set(true);

    if (this.isInWishlist()) {
      this.wishlistService.removeProductFromWishlist(id).subscribe({
        next: (res) => {
          this.toastrService.warning('Removed from wishlist', 'FreshCart');
          this.isInWishlist.set(false);
          this.isLoadingWishlist.set(false);
        },
        error: () => this.isLoadingWishlist.set(false)
      });
    } else {
      this.wishlistService.addProductToWishlist(id).subscribe({
        next: (res) => {
          this.toastrService.success(res.message, 'FreshCart');
          this.isInWishlist.set(true);
          this.isLoadingWishlist.set(false);
        },
        error: () => this.isLoadingWishlist.set(false)
      });
    }
  }

  addProductItemToCart(id: string): void {
    this.isLoadingCart.set(true);
    this.cartComponent.addProductCart(id).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.toastrService.success(res.message, 'Freshcart');
        }
        this.isLoadingCart.set(false);
      },
      error: () => this.isLoadingCart.set(false)
    });
  }
}
