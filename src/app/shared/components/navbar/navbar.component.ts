import { Component, Input, OnInit, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Cart } from '../../../features/pages/cart/services/cart';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  @Input({ required: true }) isUser: boolean = false;

  private readonly cartService = inject(Cart);
  private readonly router = inject(Router);

  cartCount = this.cartService.cartCount;

  isMobileMenuOpen = false;

  pages = [
    { text: 'Home', link: '/home' },
    { text: 'Products', link: '/products' },
    { text: 'Wishlist', link: '/wishlist' },
    { text: 'Cart', link: '/cart' },
    { text: 'Categories', link: '/categories' },
    { text: 'Brand', link: '/brand' }
  ];

  ngOnInit(): void {
    if (this.isUser) {
      this.cartService.getLoggedUserCart().subscribe();
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
}
