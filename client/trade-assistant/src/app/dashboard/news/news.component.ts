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
  newNews = {
    title: '',
    content: '',
    author: '',
    publishDate: '',
    category: ''
  };

  constructor(
    private routesService: RoutesService,
    private router: Router  // <-- инјектирање на Router
  ) {}

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
}
