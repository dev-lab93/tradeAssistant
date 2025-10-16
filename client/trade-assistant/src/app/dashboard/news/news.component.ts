import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RoutesService } from '../../services/routes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule]
})
export class NewsComponent implements OnInit {
  newsList: any[] = [];
  message = '';
  newNews = { title: '', content: '', author: '', publishDate: '', category: '' };

  // За edit
  editingNewsId: number | null = null;
  editedNews: any = {};

  constructor(private routesService: RoutesService, private router: Router) {}

  ngOnInit() {
    this.loadNews();
  }

  loadNews() {
    this.routesService.getAll('news').subscribe({
      next: (res: any) => {
        this.newsList = Array.isArray(res.items) ? res.items : [];
      },
      error: () => this.message = '❌ Грешка при вчитување на вести'
    });
  }

  addNews() {
    this.routesService.create('news', this.newNews).subscribe({
      next: () => {
        this.message = '✅ Веста е успешно додадена!';
        this.loadNews();
        this.newNews = { title: '', content: '', author: '', publishDate: '', category: '' };
      },
      error: () => this.message = '❌ Грешка при додавање на вест'
    });
  }

  deleteNews(id?: number) {
    if (id === undefined) return;
    this.routesService.delete('news', id).subscribe({
      next: () => this.loadNews(),
      error: () => this.message = '❌ Грешка при бришење на вест'
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/auth/login']);
  }

  // Edit методи
  startEdit(news: any) {
    this.editingNewsId = news.id!;
    this.editedNews = { ...news }; // копија за edit
  }

  cancelEdit() {
    this.editingNewsId = null;
    this.editedNews = {};
  }

  saveEdit() {
    if (!this.editingNewsId) return;
    this.routesService.update('news', this.editingNewsId, this.editedNews).subscribe({
      next: () => {
        this.message = '✅ Веста е успешно изменета!';
        this.loadNews();
        this.cancelEdit();
      },
      error: () => this.message = '❌ Грешка при изменување на веста'
    });
  }
}
