import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './pages/homepage/home.component';
import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'auth/login', component: LoginComponent },

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
        path: 'trades',
        loadComponent: () =>
          import('./dashboard/products/products.component').then(m => m.ProductsComponent)
      }
    ]
  },
  { path: '**', redirectTo: 'auth/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
