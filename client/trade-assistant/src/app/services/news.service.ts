import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface News {
  id?: number;
  title: string;
  content: string;
  author: string;
  publishDate: string;
  category: string;
  image?: string; // ако сакаш да прикажуваш слика
}

export interface NewsCategoryGroup {
  [category: string]: News[];
}

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private baseUrl = `${environment.apiUrl}/news`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<News[]> {
    return this.http.get<News[]>(this.baseUrl);
  }

  getOne(id: number): Observable<News> {
    return this.http.get<News>(`${this.baseUrl}/${id}`);
  }

  create(data: News): Observable<News> {
    return this.http.post<News>(this.baseUrl, data);
  }

  update(id: number, data: Partial<News>): Observable<News> {
    return this.http.put<News>(`${this.baseUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  groupByCategory(newsList: News[]): { [key: string]: News[] } {
  if (!Array.isArray(newsList)) return {};

  return newsList.reduce((acc, news) => {
    const category = news.category?.trim() || 'Нема категорија';
    if (!acc[category]) acc[category] = [];
    acc[category].push(news);
    return acc;
  }, {} as { [key: string]: News[] });
  }
}
