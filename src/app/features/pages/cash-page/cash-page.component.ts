import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cart } from '../cart/services/cart';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-cash',
  standalone: true,
  imports: [ReactiveFormsModule,TranslateModule],
  templateUrl: './cash-page.component.html'
})
export class CashComponent {
  private readonly fb = inject(FormBuilder);
  private readonly cartService = inject(Cart);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  isLoading = signal(false);
  cartId: string = '';

  shippingForm: FormGroup = this.fb.group({
    details: ['', [Validators.required]],
    phone: ['', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
    city: ['', [Validators.required]]
  });

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.cartId = params.get('id') || '';
    });
  }

  submitOrder() {
    if (this.shippingForm.valid && this.cartId) {
      this.isLoading.set(true);
      this.cartService.createCashOrder(this.cartId, this.shippingForm.value).subscribe({
        next: (res) => {
          this.isLoading.set(false);
          this.cartService.cartCount.set(0);
          alert('Order Created Successfully!');
          this.router.navigate(['/home']);
        },
        error: (err) => {
          this.isLoading.set(false);
          console.error(err);
        }
      });
    }
  }
}
