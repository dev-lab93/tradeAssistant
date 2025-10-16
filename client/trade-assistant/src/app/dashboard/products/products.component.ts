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

  // Нов продукт за додавање
  newProduct: Product = { name: '', category: '', quantity: 0 };

  // За edit
  editingProductId: number | null = null;
  editedProduct: Product = { name: '', category: '', quantity: 0 };

  constructor(private productsService: ProductsService, private router: Router) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productsService.getAll().subscribe({
      next: (res: any) => {
        this.productsList = Array.isArray(res.items) ? res.items : res; // ако API враќа директно array
      },
      error: () => this.message = '❌ Грешка при вчитување на продукти'
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

  // --- Edit функции ---
  startEdit(product: Product) {
    this.editingProductId = product.id!;
    this.editedProduct = { ...product };
  }

  cancelEdit() {
    this.editingProductId = null;
    this.editedProduct = { name: '', category: '', quantity: 0 };
  }

  saveEdit() {
    if (!this.editingProductId) return;
    this.productsService.update(this.editingProductId, this.editedProduct).subscribe({
      next: () => {
        this.message = '✅ Продуктот е успешно изменет!';
        this.loadProducts();
        this.cancelEdit();
      },
      error: () => this.message = '❌ Грешка при изменување на продукт'
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/auth/login']);
  }
}
