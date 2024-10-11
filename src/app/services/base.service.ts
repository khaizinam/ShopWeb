import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BaseService {
  public domain = 'http://localhost:3000'; //
  public route = ''; //

  constructor(public http: HttpClient) {}

  public getUrl(){
    return `${this.domain}/${this.route}`
  }

  public getBy(query:string): Observable<any> {
    return this.http.get<any>(`${this.getUrl()}?${query}`);
  }

  public getById(id:number|string|null): Observable<any> {
    return this.http.get<any>(`${this.getUrl()}/${id}`);
  }

  public getAll(): Observable<any> {
    return this.http.get<any>(`${this.getUrl()}`);
  }

  public store(data:any): Observable<any> {
    data = { ...data, created_at : this.getTimeNow(), updated_at : this.getTimeNow()}
    return this.http.post<any>(`${this.getUrl()}`, data);
  }

  public update(data:any): Observable<any> {
    data = {...data, updated_at : this.getTimeNow()}
    return this.http.put<any>(`${this.getUrl()}/${data.id}`, data);
  }

  public delete(id:number|string): Observable<any> {
    return this.http.delete<any>(`${this.getUrl()}/${id}`);
  }

  public getCookie(name: string): string | null {
    const match = document.cookie.match(new RegExp('(^|; )' + name + '=([^;]*)'));
    return match ? decodeURIComponent(match[2]) : null; // Return the cookie value or null
  }

  public getTimeNow(){
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(currentDate.getDate()).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }
}
