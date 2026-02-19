import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CurrencyPipe } from '@angular/common';
import { Iproducts } from '../../../../shared/models/products/iproducts.interface';
import { Iresult } from '../../../../shared/models/results/iresult.interface';
import { ProductsService } from '../../../../core/services/products/products';
import { CategoriesService } from '../../../../core/services/categories/categories.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-categories-detailes',
  standalone: true,
  imports: [RouterLink, CurrencyPipe,TranslateModule],
  templateUrl: './categories-detailes.component.html',
  styleUrl: './categories-detailes.component.css',
})
export class CategoriesDetailesComponent implements OnInit {
  private readonly categoriesService = inject(CategoriesService);
  private readonly toastrService = inject(ToastrService);
  private readonly activatedRoute = inject(ActivatedRoute);

  categoryId: string | null = null;
  categoryName: string = '';
  products = signal<Iproducts[]>([]);
  isLoading = signal<boolean>(true);

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (params) => {
        this.categoryId = params.get('id');
        this.categoryName = params.get('name') || 'This Category';
        if (this.categoryId) {
          this.loadProductsByCategory(this.categoryId);
        }
      },
    });
  }

  loadProductsByCategory(categoryId: string): void {
    this.categoriesService.getProductsByCategory(categoryId).subscribe({
      next: (response: Iresult<Iproducts[]>) => {
        this.products.set(response.data);
        this.isLoading.set(false);
      },
      error: (error: any) => {
        console.error('Error loading products:', error);
        this.toastrService.error('Failed to load products', 'Error');
        this.isLoading.set(false);
      }
    });
  }
}
