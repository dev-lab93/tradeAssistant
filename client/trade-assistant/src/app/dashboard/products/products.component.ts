import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProductsService, Product } from '../../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule]
})
export class ProductsComponent implements OnInit {
  productsList: Product[] = [];
  message = '';

  // ⚠️ Овде исправено: користиме Product полја
  newProduct: Product = { name: '', category: '', quantity: 0 };
  products: any;

  constructor(private productsService: ProductsService, private router: Router) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productsService.getAll().subscribe((res: any) => {
    this.products = res.items; // now this.products is an array
  });
  }

  addProduct() {
    this.productsService.create(this.newProduct).subscribe({
      next: () => {
        this.message = '✅ Продуктот е успешно додаден!';
        this.loadProducts();
        this.newProduct = { name: '', category: '', quantity: 0 };
      },
      error: () => this.message = '❌ Грешка при додавање на продукт'
    });
  }

  deleteProduct(id: number) {
    this.productsService.delete(id).subscribe({
      next: () => this.loadProducts(),
      error: () => this.message = '❌ Грешка при бришење на продукт'
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/auth/login']);
  }
}
