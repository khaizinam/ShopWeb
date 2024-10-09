import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'http://localhost:3000/category'; // Your JSON server URL
  
  constructor(private http: HttpClient) {}

  getAll(): any {
    return this.http.get<any>(`${this.apiUrl}`);
  }

  getById(id:any): any {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}
