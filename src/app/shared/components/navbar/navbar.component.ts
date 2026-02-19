import { Component, Input, OnInit, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Cart } from '../../../features/pages/cart/services/cart';
import { Mytranslate } from '../../../core/services/mytranslate/mytranslate';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, TranslateModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  @Input({ required: true }) isUser: boolean = false;

  private readonly cartService = inject(Cart);
  private readonly router = inject(Router);
  private readonly translateService = inject(Mytranslate);

  cartCount = this.cartService.cartCount;
  isMobileMenuOpen = false;
  currentLang: string = 'en';

  pages = [
    { text: 'nav.home', link: '/home' },
    { text: 'nav.products', link: '/products' },
    { text: 'nav.wishlist', link: '/wishlist' },
    { text: 'nav.cart', link: '/cart' },
    { text: 'nav.categories', link: '/categories' },
    { text: 'nav.brand', link: '/brand' }
  ];

  ngOnInit(): void {
    if (this.isUser) {
      this.cartService.getLoggedUserCart().subscribe();
    }

    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('lang');
      this.currentLang = savedLang || 'en';
    }
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  signOut(): void {
    localStorage.removeItem('token');
    this.cartService.cartCount.set(0);
    this.router.navigate(['/login']);
  }

  switchLanguage(lang: string): void {
    this.currentLang = lang;
    this.translateService.changLang(lang);
  }
}
