import { Component, OnInit, inject, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Brands } from './services/brands';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [CommonModule,RouterLink,TranslateModule],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css',
})
export class BrandsComponent implements OnInit {

  private readonly brandsService = inject(Brands);

  brandsList: WritableSignal<any[]> = signal([]);

  loading = signal(true);

  ngOnInit(): void {
    this.getBrands();
  }

  getBrands(): void {
    this.brandsService.getAllBrands().subscribe({
      next: (res: any) => {
        this.brandsList.set(res.data);
        this.loading.set(false);
      },
      error: (err) => {
        console.log(err);
        this.loading.set(false);
      }
    });
  }

}
