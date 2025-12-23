import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);
  private baseUrl = 'https://jsonplaceholder.typicode.com';

  getPosts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/posts?_limit=10`);
  }

  getPostById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/posts/${id}`);
  }

  getCommentsByPost(id: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/posts/${id}/comments`);
  }
}
