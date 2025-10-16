import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { HomepageService } from '../../services/homepage.service';
import { ProductsService, Product } from '../../services/product.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  newsList: any[] = [];
  newsByCategory: { [key: string]: any[] } = {};

  productsList: Product[] = [];
  message = '';

  constructor(
    private homepageService: HomepageService,
    private productsService: ProductsService
  ) {}

  ngOnInit() {
    this.loadNews();
    this.loadProducts();
  }

  loadNews() {
    this.homepageService.getAllNews().subscribe({
      next: (res) => {
        this.newsList = res;
        this.newsByCategory = this.homepageService.groupByCategory(this.newsList);
      },
      error: () => this.message = '❌ Грешка при вчитување на вести'
    });
  }

  loadProducts() {
    this.productsService.getAll().subscribe({
      next: (res: any) => {
        // Backend враќа { items: [...] } или директно масив
        this.productsList = Array.isArray(res) ? res : res.items ? res.items : [];
      },
      error: () => this.message = '❌ Грешка при вчитување на продукти'
    });
  }
}
