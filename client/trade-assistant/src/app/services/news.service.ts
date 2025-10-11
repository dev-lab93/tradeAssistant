import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

export interface News {
  id?: number;
  title: string;
  content: string;
  author: string;
  publishDate: string;
  category: string;
}

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private baseUrl = 'http://localhost:3000/news';

  constructor(private http: HttpClient, private auth: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.auth.getToken();
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  getAll(): Observable<News[]> {
    return this.http.get<News[]>(this.baseUrl, { headers: this.getHeaders() });
  }

  getOne(id: number): Observable<News> {
    return this.http.get<News>(`${this.baseUrl}/${id}`, { headers: this.getHeaders() });
  }

  create(data: News): Observable<News> {
    return this.http.post<News>(this.baseUrl, data, { headers: this.getHeaders() });
  }

  update(id: number, data: News): Observable<News> {
    return this.http.put<News>(`${this.baseUrl}/${id}`, data, { headers: this.getHeaders() });
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { headers: this.getHeaders() });
  }
}
