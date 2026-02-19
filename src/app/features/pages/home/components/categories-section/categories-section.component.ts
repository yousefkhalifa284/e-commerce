import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CategoriesService } from '../../../../../core/services/categories/categories.service';
import { Icategory } from '../../../../../shared/models/categories/icategory.interface';
import { CategoryCardComponent } from "../../../../../shared/components/category-card/category-card.component";
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Mytranslate } from '../../../../../core/services/mytranslate/mytranslate';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-categories-section',
  imports: [CategoryCardComponent, CarouselModule],
  templateUrl: './categories-section.component.html',
  styleUrl: './categories-section.component.css',
})
export class CategoriesSectionComponent implements OnInit, OnDestroy {
  private readonly _CategoriesService = inject(CategoriesService);
  private readonly translateService = inject(Mytranslate);
  private langSubscription: Subscription;

  currentLang: string = 'en';
  category: Icategory[] = [];

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
      0: { items: 2 },
      400: { items: 3 },
      740: { items: 4 },
      940: { items: 5 }
    },
    nav: false,
    rtl: this.currentLang === 'ar'
  };

  constructor() {
    this.langSubscription = this.translateService.translateService.onLangChange.subscribe(event => {
      this.currentLang = event.lang;
      this.updateSliderDirection();
    });
  }

  ngOnInit(): void {
    this.getCatigories();

    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('lang');
      this.currentLang = savedLang || 'en';
      this.customOptions = {
        ...this.customOptions,
        rtl: this.currentLang === 'ar'
      };
    }
  }

  getCatigories() {
    this._CategoriesService.getAllCategories().subscribe((res) => {
      this.category = res.data;
    });
  }

  updateSliderDirection(): void {
    this.customOptions = {
      ...this.customOptions,
      rtl: this.currentLang === 'ar'
    };

    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 100);
  }

  ngOnDestroy(): void {
    if (this.langSubscription) {
      this.langSubscription.unsubscribe();
    }
  }
}
