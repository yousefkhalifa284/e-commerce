import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductDetailsServices } from '../../../core/services/product-details/product-details.services';
import { Iproducts } from '../../../shared/models/products/iproducts.interface';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../wishlist/serivces/wishlist';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Cart } from '../cart/services/cart';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-products-details',
  standalone: true,
  imports: [CommonModule, RouterModule,TranslateModule],
  templateUrl: './products-details.component.html',
  styleUrl: './products-details.component.css',
})
export class ProductsDetailsComponent implements OnInit {
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _ProductsDetailsServices = inject(ProductDetailsServices);
  private readonly _wishlistService = inject(WishlistService);
  private readonly _cartService = inject(Cart);
  private readonly _toastr = inject(ToastrService);

  productId = signal<string | null>(null);
  product = signal<Iproducts | null>(null);
  isLoading = signal<boolean>(true);
  isLoadingCart = signal<boolean>(false);

  isLoadingWishlist = signal<boolean>(false);

  wishlistIds = signal<string[]>([]);

  ngOnInit(): void {
    this.listenToRouteParams();
    this.getWishlistData();
  }

  getWishlistData() {
    this._wishlistService.getLoggedUserWishlist().subscribe({
      next: (res) => {
        const ids = res.data.map((item: any) => item._id || item.id);
        this.wishlistIds.set(ids);
      }
    });
  }

  listenToRouteParams() {
    this._ActivatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');
      this.productId.set(id);
      if (id) this.loadProduct(id);
    });
  }

  loadProduct(id: string) {
    this.isLoading.set(true);
    this._ProductsDetailsServices.getProductsDetails(id).subscribe({
      next: (res) => {
        this.product.set(res.data);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false)
    });
  }

  addProductItemToCart(id: string | undefined): void {
    if (!id) return;
    this.isLoadingCart.set(true);
    this._cartService.addProductCart(id).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this._toastr.success(res.message);
        }
        this.isLoadingCart.set(false);
      },
      error: () => {
        this._toastr.error('Failed to add product');
        this.isLoadingCart.set(false);
      }
    });
  }

  toggleWishlist(id: string | undefined) {
    if (!id) return;

    this.isLoadingWishlist.set(true);

    if (this.isInWishlist(id)) {
      this._wishlistService.removeProductFromWishlist(id).subscribe({
        next: (res) => {
          this._toastr.error('Removed from wishlist');
          this.wishlistIds.update(ids => ids.filter(wishId => wishId !== id));
          this.isLoadingWishlist.set(false);
        },
        error: () => this.isLoadingWishlist.set(false)
      });
    } else {
      this._wishlistService.addProductToWishlist(id).subscribe({
        next: (res) => {
          if (res.status === 'success') {
            this._toastr.success(res.message);
            this.wishlistIds.set(res.data);
          }
          this.isLoadingWishlist.set(false); // إيقاف الـ Load
        },
        error: () => this.isLoadingWishlist.set(false)
      });
    }
  }

  isInWishlist(id: string | undefined): boolean {
    return id ? this.wishlistIds().includes(id) : false;
  }
}
