import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Iproducts } from '../../models/products/iproducts.interface';
import { ProductsService } from '../../../core/services/products/products';
import { ProductCardComponent } from "../product-card/product-card.component";
import { NgxPaginationModule } from 'ngx-pagination';
import { SearchPipe } from '../../pipes/search-pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  imports: [CommonModule, ProductCardComponent, NgxPaginationModule,SearchPipe,FormsModule],
})
export class ProductsComponent implements OnInit {
  private readonly _ProductsService = inject(ProductsService);

  products = signal<Iproducts[]>([]);
  isLoading = signal(true);

  page = 1;
  readonly itemsPerPage = 12;
  totalItems = 0;
  totalPages = 0;
  text:string='';

  ngOnInit(): void {
    this.getProducts(this.page);
  }

  getProducts(page: number) {
    this.isLoading.set(true);
    this._ProductsService.getAllProducts(page, this.itemsPerPage).subscribe({
      next: (res) => {
        this.products.set(res.data);
        this.totalPages = res.metadata?.numberOfPages ?? 0;
        this.totalItems = this.totalPages * this.itemsPerPage;
        this._ProductsService.products.set(res.data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.isLoading.set(false);
      }
    });
  }

  changePage(page: number) {
    this.page = page;
    this.getProducts(this.page);
  }
}
