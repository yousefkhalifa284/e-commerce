import { Component, computed, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { Cart } from './services/cart';
import { CartDetails } from './models/cart-details';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink,TranslateModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  cardDetailsData: WritableSignal<CartDetails> = signal<CartDetails>({} as CartDetails);
  isLoading = signal(true);
  isRemovingId = signal<string | null>(null);
  isClearingCart = signal<boolean>(false);

  private readonly _cartService = inject(Cart);
  private readonly _toastr = inject(ToastrService);

  ngOnInit(): void {
    this.getUserCartData();
  }


  getUserCartData(): void {
    this.isLoading.set(true);
    this._cartService.getLoggedUserCart().subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.cardDetailsData.set(res.data);
        }
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.isLoading.set(false);
      }
    });
  }


  removeProductItemFromCart(id: string): void {
    this.isRemovingId.set(id);
    this._cartService.removeProductFromCart(id).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.cardDetailsData.set(res.data);
          this._toastr.error('Product removed from your cart');
        }
        this.isRemovingId.set(null);
      },
      error: (err) => {
        console.error(err);
        this.isRemovingId.set(null);
      }
    });
  }

  updateProductCount(id: string, count: number): void {
    if (count <= 0) return;

    this._cartService.updateProductCartQuantity(id, count).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.cardDetailsData.set(res.data);
          this._toastr.success('Quantity updated');
        }
      },
      error: (err) => console.error(err)
    });
  }


  clearUserCart(): void {
    this.isClearingCart.set(true);
    this._cartService.clearCart().subscribe({
      next: (res) => {
        if (res.message === 'success') {
          this.cardDetailsData.set({} as CartDetails);
          this._toastr.info('Your cart is now empty');
        }
        this.isClearingCart.set(false);
      },
      error: (err) => {
        console.error(err);
        this.isClearingCart.set(false);
      }
    });
  }

  isCheckoutDisabled = computed(() => {
    const cart = this.cardDetailsData();
    return !cart?._id || !cart?.products || cart.products.length === 0;
  });
}
