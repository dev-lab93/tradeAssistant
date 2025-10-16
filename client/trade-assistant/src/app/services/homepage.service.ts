import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomepageService {

  private baseUrl = 'https://tradeassistant.onrender.com/news';

  constructor(private http: HttpClient) {}

  // Преземање на сите вести
  getAllNews(): Observable<any[]> {
    return this.http.get<any>(this.baseUrl).pipe(
      map(res => Array.isArray(res.items) ? res.items : [])
    );
  }

  // Делување по категорија
  groupByCategory(newsList: any[]): { [key: string]: any[] } {
    return newsList.reduce((acc, news) => {
      const category = news.category || 'Unknown';
      if (!acc[category]) acc[category] = [];
      acc[category].push(news);
      return acc;
    }, {} as { [key: string]: any[] });
  }

  // Делување по автор
  groupByAuthor(newsList: any[]): { [key: string]: any[] } {
    return newsList.reduce((acc, news) => {
      const author = news.author || 'Unknown';
      if (!acc[author]) acc[author] = [];
      acc[author].push(news);
      return acc;
    }, {} as { [key: string]: any[] });
  }

  // Делување по месец и година на објава
  groupByMonthYear(newsList: any[]): { [key: string]: any[] } {
    return newsList.reduce((acc, news) => {
      if (!news.publishDate) return acc;
      const date = new Date(news.publishDate);
      const key = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
      if (!acc[key]) acc[key] = [];
      acc[key].push(news);
      return acc;
    }, {} as { [key: string]: any[] });
  }
}
