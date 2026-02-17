import { Component, inject, signal } from '@angular/core';
import { CategoriesService } from '../../../../../core/services/categories/categories.service';
import { Icategory } from '../../../../../shared/models/categories/icategory.interface';
import { CategoryCardComponent } from "../../../../../shared/components/category-card/category-card.component";
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-categories-section',
  imports: [CategoryCardComponent,CarouselModule ],
  templateUrl: './categories-section.component.html',
  styleUrl: './categories-section.component.css',
})
export class CategoriesSectionComponent {

  private readonly _CategoriesService = inject(CategoriesService);
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    autoplay: true,
    autoplayTimeout: 1000,
    autoplayHoverPause: true,
    margin: 10,
    navText: ['', ''],
    responsive: {
      0: {
        items: 2
      },
      400: {
        items: 3
      },
      740: {
        items: 4
      },
      940: {
        items: 5
      }
    },
    nav: false
  }

  category:Icategory[] = [];
  ngOnInit(): void {
  this.getCatigories();
  }
  getCatigories(){
    this._CategoriesService.getAllCategories().subscribe((res)=>{
      this.category = res.data;
      console.log(res);
    });
  }
}
