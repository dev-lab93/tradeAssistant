import { Routes } from '@angular/router';
import { HomeComponent } from './pages/homepage/home.component';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ArticleDetailsComponent } from './pages/article-details/article-details.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'auth/login', component: LoginComponent },

  // Route за деталите на веста
  { path: 'news/:id', component: ArticleDetailsComponent },

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
        path: 'products',
        loadComponent: () =>
          import('./dashboard/products/products.component').then(m => m.ProductsComponent)
      },
      { path: '', redirectTo: 'news', pathMatch: 'full' }
    ]
  },

  { path: '**', redirectTo: '', pathMatch: 'full' }
];
