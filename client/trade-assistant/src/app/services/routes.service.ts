import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

type RouteType = 'news' | 'products' ; // можеш да додадеш trades

@Injectable({
  providedIn: 'root'
})
export class RoutesService {
  getById(arg0: string, id: string) {
    throw new Error('Method not implemented.');
  }
  private baseUrls: Record<RouteType, string> = {
    news: 'http://localhost:3000/news',
    products: 'http://localhost:3000/products',
  };

  constructor(private http: HttpClient, private auth: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.auth.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  private getUrl(type: RouteType, id?: number): string {
    return id ? `${this.baseUrls[type]}/${id}` : this.baseUrls[type];
  }

  getAll(type: RouteType, search?: string, page?: number, limit?: number): Observable<any> {
    let params: any = {};
    if (search) params.search = search;
    if (page) params.page = page;
    if (limit) params.limit = limit;
    return this.http.get<any>(this.getUrl(type), { headers: this.getHeaders(), params });
  }

  getOne(type: RouteType, id: number): Observable<any> {
    return this.http.get<any>(this.getUrl(type, id), { headers: this.getHeaders() });
  }

  create(type: RouteType, data: any): Observable<any> {
    return this.http.post<any>(this.getUrl(type), data, { headers: this.getHeaders() });
  }

  update(type: RouteType, id: number, data: any): Observable<any> {
    return this.http.put<any>(this.getUrl(type, id), data, { headers: this.getHeaders() });
  }

  delete(type: RouteType, id: number): Observable<any> {
    return this.http.delete<any>(this.getUrl(type, id), { headers: this.getHeaders() });
  }
}
