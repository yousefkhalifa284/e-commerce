import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cart } from '../cart/services/cart';
import { CartDetails } from '../cart/models/cart-details';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {

  private readonly route = inject(ActivatedRoute);
  private readonly fb = inject(FormBuilder);
  private readonly cartService = inject(Cart);
  private readonly router = inject(Router);

  cartId!: string;
  cartDetails: WritableSignal<CartDetails | null> = signal(null);
  checkoutForm!: FormGroup;

  ngOnInit(): void {
    this.initForm();
    this.getCartFromRoute();
  }

  private initForm(): void {
    this.checkoutForm = this.fb.group({
      shippingAddress: this.fb.group({
        details: [null, Validators.required],
        phone: [null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
        city: [null, Validators.required],
      })
    });
  }

  private getCartFromRoute(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');

      if (!id) {
        this.router.navigate(['/cart']);
        return;
      }

      this.cartId = id;
      this.loadCartDetails();
    });
  }

  private loadCartDetails(): void {
    this.cartService.getLoggedUserCart().subscribe({
      next: (res) => {
        if (res.status === 'success') {

          if (res.data._id !== this.cartId) {
            this.router.navigate(['/cart']);
            return;
          }

          if (!res.data.products.length) {
            this.router.navigate(['/cart']);
            return;
          }

          this.cartDetails.set(res.data);
        }
      },
      error: () => this.router.navigate(['/cart'])
    });
  }

  onSubmitCheckoutForm(): void {

    if (this.checkoutForm.invalid) {
      this.checkoutForm.markAllAsTouched();
      return;
    }

    this.cartService.checkoutSession(this.cartId, this.checkoutForm.value)
      .subscribe({
        next: (res) => {
          if (res.status === 'success') {
            window.open(res.session.url, '_self');
          }
        },
        error: (err) => console.log(err)
      });
  }
}
