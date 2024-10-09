import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'http://localhost:3000/category'; // Your JSON server URL
  
  constructor(private http: HttpClient) {}

  public getAll(): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}`);
  }

  public getById(id:any): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}
