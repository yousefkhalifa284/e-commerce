import { Component, inject, signal } from '@angular/core';
import { Iproducts } from '../../../../../shared/models/products/iproducts.interface';
import { ProductCardComponent } from '../../../../../shared/components/product-card/product-card.component';
import { ProductsService } from '../../../../../core/services/products/products';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-proudcts-section',
  standalone: true,
  imports: [ProductCardComponent, NgxPaginationModule],
  templateUrl: './proudcts-section.component.html',
  styleUrl: './proudcts-section.component.css',
})
export class ProudctsSectionComponent {

  private readonly productsService = inject(ProductsService);

  products = signal<Iproducts[]>([]);
  page = 1;

  readonly itemsPerPage = 10;

  totalItems = 0;
  totalPages = 0;

  ngOnInit(): void {
    this.getProducts(this.page);
  }

  getProducts(page: number) {
    this.productsService.getAllProducts(page, this.itemsPerPage).subscribe({
      next: (res) => {
        this.products.set(res.data);

        this.totalPages = res.metadata?.numberOfPages ?? 0;
        this.totalItems = this.totalPages * this.itemsPerPage;
      },
      error: (err) => console.log(err)
    });
  }

  changePage(page: number) {
    this.page = page;
    this.getProducts(this.page);
  }
}
