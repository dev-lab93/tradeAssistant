import { Routes } from '@angular/router';
import { HomeComponent } from './pages/homepage/home.component';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
  // 🏠 Главна (јавна) страница
  { path: '', component: HomeComponent },

  // 🔐 Login страница
  { path: 'auth/login', component: LoginComponent },

  // 📊 Dashboard (само за логирани корисници)
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: 'news',
        loadComponent: () =>
          import('./dashboard/news/news.component').then(m => m.NewsComponent)
      },
      {
        path: 'news/:id',
        loadComponent: () =>
          import('./pages/article-details/article-details.component').then(m => m.ArticleDetailsComponent)
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./dashboard/products/products.component').then(m => m.ProductsComponent)
      },
      // опционално можеш да ставиш default child
      { path: '', redirectTo: 'news', pathMatch: 'full' }
    ]
  },

  // 🚧 Ако корисникот внесе непостоечка рута → врати го на Home
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
