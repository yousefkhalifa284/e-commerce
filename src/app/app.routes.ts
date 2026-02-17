
import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth/auth-guard';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },

    {
        path: '',
        loadComponent: () => import('./core/layouts/component/guest-layout/guest-layout.component')
            .then(c => c.GuestLayoutComponent),
        children: [
            {
                path: 'login',
                title: 'Login',
                loadComponent: () => import('./core/auth/login/login.component')
                    .then(c => c.LoginComponent)
            },
            {
                path: 'signup',
                title: 'Sign Up',
                loadComponent: () => import('./core/auth/signup/signup.component')
                    .then(c => c.SignupComponent)
            },
            {
                path: 'forget-password',
                title: 'Forget Password',
                loadComponent: () => import('./core/auth/forget-password/forget-password.component')
                    .then(c => c.ForgotPasswordComponent)
            }
        ]
    },
    {
        path: '',
        loadComponent: () => import('./core/layouts/component/user-layout/user-layout.component')
            .then(c => c.UserLayoutComponent),
        children: [
            {
                path: 'home',
                title: 'Home',
                canActivate: [authGuard],
                loadComponent: () => import('./features/pages/home/home.component')
                    .then(c => c.HomeComponent)
            },
            {
                path: 'categories',
                title: 'Categories',
                canActivate: [authGuard],
                loadComponent: () => import('./features/pages/categories/categories.component')
                    .then(c => c.CategoriesComponent)
            },
            {
                path: 'cart',
                title: 'Shopping Cart',
                canActivate: [authGuard],
                loadComponent: () => import('./features/pages/cart/cart.component')
                    .then(c => c.CartComponent)
            },
            {
                path: 'products',
                title: 'Products',
                canActivate: [authGuard],
                loadComponent: () => import('./shared/components/products/products.component')
                    .then(c => c.ProductsComponent)
            },
            {
                path: 'product-datails/:id',
                title: 'Product Details',
                canActivate: [authGuard],
                loadComponent: () => import('./features/pages/products-details/products-details.component')
                    .then(c => c.ProductsDetailsComponent)
            },
            {
                path: 'brand',
                title: 'Brands',
                canActivate: [authGuard],
                loadComponent: () => import('./features/pages/brands/brands.component')
                    .then(c => c.BrandsComponent)
            },
            {
                path: 'checkout/:id',
                title: 'Checkout',
                canActivate: [authGuard],
                loadComponent: () => import('./features/pages/checkout/checkout.component')
                    .then(c => c.CheckoutComponent)
            },
            {
                path: 'cash/:id',
                title: 'cash',
                canActivate: [authGuard],
                loadComponent: () => import('./features/pages/cash-page/cash-page.component')
                    .then(c => c.CashComponent)
            },
            {
                path: 'allorders',
                title: 'All Orders',
                canActivate: [authGuard],
                loadComponent: () => import('./features/pages/allorders/allorders')
                    .then(c => c.AllOrdersComponent)
            },
            {
                path: 'wishlist',
                title: 'Wishlist',
                canActivate: [authGuard],
                loadComponent: () => import('./features/pages/wishlist/wishlist.component')
                    .then(c => c.WishlistComponent)
            },
            {
                path: 'category-products/:id',
                title: 'Category Products',
                canActivate: [authGuard],
                loadComponent: () => import('./features/pages/categories/categories-detailes/categories-detailes.component')
                    .then(c => c.CategoriesDetailesComponent)
            },
            {
                path: 'specific-brand/:id',
                title: 'Brand Details',
                canActivate: [authGuard],
                loadComponent: () => import('./features/pages/brands/specific-brand/specific-brand.component')
                    .then(c => c.SpecificBrandComponent)
            },
        ]
    },
    {
        path: '**',
        title: 'Page Not Found',
        loadComponent: () => import('./features/pages/not-found/not-found.component')
            .then(c => c.NotFoundComponent)
    }
];
