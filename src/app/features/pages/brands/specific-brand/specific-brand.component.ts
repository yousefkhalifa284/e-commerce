import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { CurrencyPipe } from '@angular/common';
import { Brands } from '../services/brands';
import { ProductsService } from '../../../../core/services/products/products';
import { Brand } from '../../cart/models/cart-details';
import { Ibrand } from '../../../../shared/models/brands/ibrand.interface';

@Component({
  selector: 'app-specific-brand',
  standalone: true,
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './specific-brand.component.html',
  styleUrl: './specific-brand.component.css'
})
export class SpecificBrandComponent implements OnInit {
  private readonly brandsService = inject(Brands);
  private readonly productsService = inject(ProductsService);
  private readonly toastrService = inject(ToastrService);
  private readonly activatedRoute = inject(ActivatedRoute);

  brandId: string | null = null;
  brand = signal<Ibrand | null>(null);
  products = signal<any[]>([]);
  isLoadingBrand = signal<boolean>(true);
  isLoadingProducts = signal<boolean>(true);

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (params) => {
        this.brandId = params.get('id');
        if (this.brandId) {
          this.loadBrandDetails(this.brandId);
          this.loadProductsByBrand(this.brandId);
        }
      },
    });
  }

  loadBrandDetails(brandId: string): void {
    this.brandsService.getSpecificBrand(brandId).subscribe({
      next: (response) => {
        this.brand.set(response.data);
        this.isLoadingBrand.set(false);
      },
      error: (error) => {
        console.error('Error loading brand:', error);
        this.toastrService.error('Failed to load brand details', 'Error');
        this.isLoadingBrand.set(false);
      }
    });
  }

  loadProductsByBrand(brandId: string): void {
    this.brandsService.getProductsByBrand(brandId).subscribe({
      next: (response) => {
        this.products.set(response.data);
        this.isLoadingProducts.set(false);
      },
      error: (error) => {
        console.error('Error loading products:', error);
        this.toastrService.error('Failed to load products', 'Error');
        this.isLoadingProducts.set(false);
      }
    });
  }
}
