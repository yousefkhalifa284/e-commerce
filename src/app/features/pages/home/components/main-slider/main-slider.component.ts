import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Subscription } from 'rxjs';
import { Mytranslate } from '../../../../../core/services/mytranslate/mytranslate';

@Component({
  selector: 'app-main-slider',
  imports: [CarouselModule],
  templateUrl: './main-slider.component.html',
  styleUrl: './main-slider.component.css',
})
export class MainSliderComponent implements OnInit, OnDestroy {
  private translateService = inject(Mytranslate);
  private langSubscription: Subscription;

  currentLang: string = 'en';

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 1000,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
    margin: 10,
    navText: [],
    items: 1,
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
    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('lang');
      this.currentLang = savedLang || 'en';
      this.customOptions = {
        ...this.customOptions,
        rtl: this.currentLang === 'ar'
      };
    }
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
