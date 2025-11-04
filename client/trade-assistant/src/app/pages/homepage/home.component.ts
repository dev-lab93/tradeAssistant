import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NewsService } from '../../services/news.service';
import { ProductsService, Product } from '../../services/product.service';

import { ArticleCardComponent } from '../../shared/article-card/article-card.component';
import { ProductCardComponent } from '../../shared/product-card/product-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ArticleCardComponent,
    ProductCardComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  articleList: any[] = [];
  articleByCategory: { [key: string]: any[] } = {};

  productsList: Product[] = [];
  message = '';

  constructor(
    private newsService: NewsService,
    private productsService: ProductsService
  ) {}

  ngOnInit() {
    this.loadNews();
    this.loadProducts();
  }

  loadNews() {
    this.newsService.getAll().subscribe({
      next: (res: any) => {
        this.articleList = Array.isArray(res) ? res : res.items ? res.items : [];
        this.articleByCategory = this.newsService.groupByCategory(this.articleList);
      },
      error: () => (this.message = '❌ Грешка при вчитување на вести')
    });
  }

  loadProducts() {
    this.productsService.getAll().subscribe({
      next: (res: any) => {
        this.productsList = Array.isArray(res)
          ? res
          : res.items
            ? res.items
            : [];
      },
      error: () => (this.message = '❌ Грешка при вчитување на продукти')
    });
  }
}
