import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = 'http://localhost:3000/product'; // Your JSON server URL
  
  constructor(private http: HttpClient) {}

  // Get all posts
  getByCategory(category_id:any): any {
    return this.http.get<any>(`${this.apiUrl}?category_id=${category_id}`);
  }
  // Get all posts
  getById(id:any): any {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}
