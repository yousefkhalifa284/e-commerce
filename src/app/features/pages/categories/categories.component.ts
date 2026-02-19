import { Component, OnInit, inject, signal } from '@angular/core';
import { CategoriesService } from '../../../core/services/categories/categories.service';
import { Icategory } from '../../../shared/models/categories/icategory.interface';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [RouterLink,TranslateModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit {
  private readonly _categoriesService = inject(CategoriesService);

  categoriesList = signal<Icategory[]>([]);
  isLoading = signal<boolean>(true);

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this._categoriesService.getAllCategories().subscribe({
      next: (res) => {
        this.categoriesList.set(res.data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.isLoading.set(false);
      }
    });
  }
}
