import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

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
export class AuthService extends BaseService{
  public override route = 'user'; // Your JSON server URL

  public login({email , pass}:any): Observable<User> {
    return this.http.get<any>(`${this.getUrl()}/?email=${email}&pass=${pass}`);
  }

  public getUser(){
    const user = this.getCookie("user");
    console.log("user", user);
    return user;
  }

  public logout() {
    document.cookie = "user=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
}
