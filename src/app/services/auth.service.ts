import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface User {
  id?: number; // Optional for new users
  name: string;
  email: string;
  pass: string;
  phone: string;
  address: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/user'; // Your JSON server URL
  
  constructor(private http: HttpClient) {}

  public store(data:User): Observable<User> {
    return this.http.post<any>(`${this.apiUrl}`, data);
  }

  public update(data:User): Observable<User> {
    return this.http.put<any>(`${this.apiUrl}/${data.id}`, data);
  }

  public getById(id:number): Observable<User> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  public login({email , pass}:any): Observable<User> {
    return this.http.get<any>(`${this.apiUrl}/?email=${email}&pass=${pass}`);
  }
}
