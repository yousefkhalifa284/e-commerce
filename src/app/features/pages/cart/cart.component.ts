import { Component, computed, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { Cart } from './services/cart';
import { CartDetails } from './models/cart-details';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  cardDetailsData: WritableSignal<CartDetails> = signal<CartDetails>({} as CartDetails);
  isLoading = signal(true); // حالة التحميل الأساسية

  private readonly cart = inject(Cart);
  private readonly _CartService = inject(Cart);

  ngOnInit(): void {
    this.getUserCartData();
  }

  getUserCartData() {
    this.isLoading.set(true);
    this.cart.getLoggedUserCart().subscribe({
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
    this.cart.removeProductFromCart(id).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.cardDetailsData.set(res.data);
        }
      },
      error: (err) => console.error(err)
    });
  }

  updateProductCount(id: string, count: number) {
    if (count <= 0) return; // منع الكميات السالبة
    this.cart.updateProductCartQuantity(id, count).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.cardDetailsData.set(res.data);
        }
      },
      error: (err) => console.error(err)
    });
  }

  clearUserCart() {
    this._CartService.clearCart().subscribe({
      next: (res) => {
        this.cardDetailsData.set({} as CartDetails);
        this.getUserCartData();
      },
      error: (err) => console.error(err)
    });
  }

  isCheckoutDisabled = computed(() => {
    const cart = this.cardDetailsData();
    return !cart?._id || !cart?.products || cart.products.length === 0;
  });
}
